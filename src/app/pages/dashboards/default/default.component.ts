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
    PowerFactor: 0,
    Voltage: 0,
  };

  maximumValuesSensorData: SensorData = {
    Current: 1,
    Energy: 1,
    Frequency: 100,
    Power: 100,
    PowerFactor: 1,
    Voltage: 300,
  };

  sensorDataArray: Array<{
    key: string;
    value: number;
    options: Object;
    adjustedValue: number;
  }>;

  public canvasWidth = 300;
  public needleValue = 65;
  public centralLabel = "";
  public name = "Gauge chart";
  public bottomLabel = "65";
  public options = {
    hasNeedle: true,
    needleColor: "gray",
    needleUpdateSpeed: 2000,
    arcColors: [
      "rgb(232, 232, 232)",
      "rgb(225, 232, 7)",
      "rgb(4, 194, 29)",
      "rgb(237, 66, 66)",
    ],
    arcDelimiters: [10, 40, 80],
    rangeLabel: ["0", "70"],
    needleStartValue: 0,
  };

  optionsObject: Array<{ key: string; value: object }> = [
    {
      key: "Current",
      value: {
        ...this.options,
        rangeLabel: ["0", this.maximumValuesSensorData["Current"].toString()],
      },
    },
    {
      key: "Energy",
      value: {
        ...this.options,
        rangeLabel: ["0", this.maximumValuesSensorData["Energy"].toString()],
      },
    },
    {
      key: "Frequency",
      value: {
        ...this.options,
        rangeLabel: ["0", this.maximumValuesSensorData["Frequency"].toString()],
      },
    },
    {
      key: "Power",
      value: {
        ...this.options,
        rangeLabel: ["0", this.maximumValuesSensorData["Power"].toString()],
        arcDelimiters: [20, 60],
      },
    },
    {
      key: "PowerFactor",
      value: {
        ...this.options,
        rangeLabel: [
          "0",
          this.maximumValuesSensorData["PowerFactor"].toString(),
        ],
      },
    },
    {
      key: "Voltage",
      value: {
        ...this.options,
        rangeLabel: ["0", this.maximumValuesSensorData["Voltage"].toString()],
      },
    },
  ];

  // currentOptions = ;

  constructor() {}

  ngOnInit() {
    console.log(database);
    const starCountRef = ref(database, "UserDataSensors");
    onValue(starCountRef, (snapshot) => {
      this.sensorData = snapshot.val();
      this.sensorDataArray = Object.keys(this.sensorData).map((key) => {
        return {
          key: key,
          value: this.sensorData[key],
          options: this.optionsObject.filter((x) => x.key == key)[0]
            ? this.optionsObject.filter((x) => x.key == key)[0].value
            : this.options,
          adjustedValue:
            (this.sensorData[key] / this.maximumValuesSensorData[key]) * 100,
        };
      });
      console.log(this.sensorDataArray);
      console.log(this.optionsObject.filter((x) => x.key));
    });
  }
}
