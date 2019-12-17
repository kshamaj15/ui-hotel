import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit, AfterViewChecked {

  constructor(private http: HttpClient){}

  regularDistribution = 100 / 3;
  searchTxt: any;
  filterHotelList: any;
  data: any;
  showList: boolean = false;
  regionArr: any = [];

  ngOnInit() {
    this.http.get('../../assets/data.json').subscribe( res => {
      this.data = res;
      console.log(res);
      this.filterHotelList = res;
      this.data.forEach(element => {
        this.regionArr.push(element.neighbourhood_group);
      });
      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      }
      this.regionArr = this.regionArr.filter(distinct);
      console.log(this.regionArr);
    })
  }

  ngAfterViewChecked() {
    this.filterHotelList = this.data;
  }

  search(s){
    if(s=='')
    this.filterHotelList = this.data;
    else
    this.filterHotelList = this.data.filter( h => h.name.toLowerCase().includes(s));
    console.log(this.filterHotelList);
  }

  showHotels(cin, cout){
    if(cin - cout < 1){
      this.showList = true;
    }
    else{
      this.showList = false;
    }
  }

  sortByRegion(e){
    let value = e.target.value.toLowerCase();
    if(value === 'all'){
      this.filterHotelList = this.data;
    }
    else{
      this.filterHotelList = this.data.filter(h => h.neighbourhood_group.toLowerCase() == value);
    }
  }

  sortByPrice(e){
    if(e.target.value.toLowerCase() === 'high to low'){
      this.filterHotelList = this.data.sort((a, b) => {
        if(a.price > b.price)
        return 1;
        else
        return -1;
      })
    }
    else{
      this.filterHotelList = this.data.sort((a, b) => {
        if(a.price < b.price)
        return 1;
        else
        return -1;
      })
    }
  }

  sortByType(e){
    if(e.target.value.toLowerCase() === 'private room'){
      console.log(e.target.value);

      this.filterHotelList = this.data.filter(h => {
        let bool = h.room_type.toLowerCase() === e.target.value.toLowerCase();
        console.log(bool);
        return bool;
      });
      console.log(this.filterHotelList);
      console.log(e.target.value);
    }
    else if(e.target.value.toLowerCase() === 'all'){
      this.filterHotelList = this.data;
    }
    else{
      this.filterHotelList = this.data.filter(h => h.room_type.toLowerCase() !== 'private room');
      console.log(this.filterHotelList);

    }
  }

}
