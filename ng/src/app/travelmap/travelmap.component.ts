import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { EndpointService } from '../_services/enpoint.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
@Component({
  selector: 'app-travelmap',
  templateUrl: './travelmap.component.html',
  styleUrls: ['./travelmap.component.css'],
})
export class TravelmapComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private endpService: EndpointService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  user: any;
  userId: any;
  map: any;
  countries: any = [];
  pickableCountries: any = [];
  bgColor: any;
  restColor: any;
  categoryColor: any = [];
  selectedCountries: any[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  selectedItems = [];

  mapForm = this.fb.group({
    title: [''],
    bgColor: [''],
    restColor: [''],
    categories: this.fb.array([]),
  });

  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};

  ngOnInit(): void {
    this.loadCountries();
    this.getUser();
    this.populateMapForm();
    this.dropdownSettings = {
      idField: '_id',
      textField: 'name',
      allowSearchFilter: true,
    };
  }


  public geoChart: GoogleChartInterface = {
    chartType: GoogleChartType.GeoChart,
    dataTable: [
      ['Country', 'Axis'],
      // ['Austria', 500],
      // ['Belgium', 300],
      // ['Bulgaria', 500],
      // ['Croatia', 300],
      // ['Cyprus', 500],
      // ['RU', 100],
    ],
    options: {
      //region: '150', // Europe
      colorAxis: { colors: [] },
      // colorAxis: { colors: ['#ffc107', '#fd7e14', '#dc3545'] },
      backgroundColor: '#9cf',
      datalessRegionColor: '#f8f9fa',
      defaultColor: '#6c757d',
      legend: 'none',
    },
  };

  populateMapForm() {
    this.bgColor = this.map.bgColor;
    this.restColor = this.map.restColor;
    this.geoChart.options.backgroundColor = this.bgColor;
    this.geoChart.options.datalessRegionColor = this.restColor;

    this.mapForm.patchValue({
      title: this.map.title,
      bgColor: this.map.bgColor,
      restColor: this.map.restColor,
    });

    let axisIndex = 100;
    this.map.categories.forEach((category: any, index: any) => {
      this.categoryColor[index] = category.color;
      this.categoriesForms.push(
        this.fb.group({
          name: [category.name],
          color: [category.color],
          countries: this.fb.array([]),
        })
      );

      this.geoChart.options.colorAxis.colors.push(category.color);

      let categoryForm = this.categoriesForms.at(index) as FormGroup;
      let countryForms = categoryForm.get('countries') as FormArray;

      category.countries.forEach((country: any) => {
        this.selectedCountries[index].push(country);
        this.geoChart.dataTable.push([country.name, axisIndex]);

        countryForms.push(
          this.fb.group({
            _id: [country._id],
            name: [country.name],
          })
        );
      });

      axisIndex += 100;
    });
  }

  getUser() {
    this.user = localStorage.getItem('user')
      ? localStorage.getItem('user')
      : null;

    if (this.user) {
      this.map = JSON.parse(this.user).map;
      this.userId = JSON.parse(this.user)._id;
    }
  }

  loadCountries() {
    this.endpService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  get categoriesForms() {
    return this.mapForm.get('categories') as FormArray;
  }

  addCategoryFormGroup() {
    this.categoriesForms.push(
      this.fb.group({
        name: [''],
        color: [''],
        countries: this.fb.array([]),
      })
    );
  }

  removeCategoryFormGroup(index: number) {
    this.categoryColor.splice(index, 1);
    this.selectedCountries.splice(index, 1);
    this.categoriesForms.removeAt(index);
  }

  saveMap(): void {
    let userObj = JSON.parse(this.user);
    userObj.map = this.mapForm.value;

    let emptyCountry = userObj.map.categories.find(
      (cat: any) => cat.countries.length == 0
    );
    if (emptyCountry) {
      this.toastrService.error(
        'Please select color for your categories or remove them!',
        '',
        { timeOut: 4000 }
      );
    } else {
      this.endpService
        .updateMap(this.mapForm.value, this.userId)
        .subscribe((result: any) => {
          if (result.status == 200) {
            localStorage.setItem('user', JSON.stringify(userObj));

            // this.geoChart.options.backgroundColor = this.bgColor;
            // this.geoChart.options.datalessRegionColor = this.restColor;
            // this.populateMapForm();
            // this.geoChart.component!.draw();

            this.toastrService.success(
              'Travel Map saved successfully...',
              'Nice!',
              { timeOut: 3000 }
            );

            this.router.navigate(['/menu']).then(() => {
              this.router.navigate(['/travelmap']);
            });
          } else if (result.status == 404) {
            this.toastrService.error('Unauthorized User!', '', {
              timeOut: 3000,
            });
          } else {
            this.toastrService.error('Error while saving map', '', {
              timeOut: 3000,
            });
          }
        });
    }
  }

  public onChangeBgColor(bgColor: string): void {
    this.bgColor = bgColor;
    this.mapForm.patchValue({ bgColor });
  }

  public onChangeRestColor(restColor: string): void {
    this.restColor = restColor;
    this.mapForm.patchValue({ restColor });
  }

  public onChangeCategoryColor(catColor: string, index: any): void {
    this.categoryColor[index] = catColor;
    (this.categoriesForms.at(index) as FormGroup)
      .get('color')
      ?.patchValue(catColor);
  }

  onItemSelect(selected: any, index: any) {
    let categoryForm = this.categoriesForms.at(index) as FormGroup;
    let countryForms = categoryForm.get('countries') as FormArray;
    countryForms.push(
      this.fb.group({
        _id: [selected._id],
        name: [selected.name],
      })
    );
  }

  onItemDeSelect(deselected: any, index: any) {
    let categoryForm = this.categoriesForms.at(index) as FormGroup;
    let countryForms = categoryForm.get('countries') as FormArray;
    let removeIndex = countryForms.controls.findIndex(
      (i) => i.value._id == deselected._id
    );
    countryForms.removeAt(removeIndex);

    let rmId = this.geoChart.dataTable.findIndex(
      (data: any) => data[0] == deselected.name
    );
    this.geoChart.dataTable = this.geoChart.dataTable.splice(rmId, 1);
  }

  saveAsImage() {
    this.toastrService.warning('Map is downloading...', 'Please wait', {
      timeOut: 2000,
    });
    let node = document.getElementById('mapovich');
    if (node)
      htmlToImage.toJpeg(node, { quality: 1 }).then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }
}
