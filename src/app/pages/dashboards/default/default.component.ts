import { Component, OnInit } from "@angular/core";
import { database } from "../../../configs/firebase.config";
import { onValue, ref } from "firebase/database";
import { SensorData } from "src/app/core/interfaces/sensordata.interface";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  sensorData: SensorData = {
    Current: 0,
    Energy: 0,
    Frequency: 0,
    Power: 0,
    Powerfactor: 0,
    Voltage: 0,
  };

  sensorDataArray: Array<{ key: string; value: number }>;
  constructor() {}

  ngOnInit() {
    console.log(database);
    const starCountRef = ref(database, "UserDataSensors");
    onValue(starCountRef, (snapshot) => {
      this.sensorData = snapshot.val();
      // updateStarCount(postElement, data);
      console.log(this.sensorData);
      this.sensorDataArray = Object.keys(this.sensorData).map((key) => {
        return { key: key, value: this.sensorData[key] };
      });
      console.log(this.sensorDataArray);
    });
  }
}
