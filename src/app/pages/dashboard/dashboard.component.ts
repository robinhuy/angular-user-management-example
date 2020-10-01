import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  data: any[] = [
    {
      name: "Female",
      value: 20,
    },
    {
      name: "Male",
      value: 30,
    },
  ];
  view: any[] = [450, 350];
  showLabels: boolean = true;
  colorScheme = {
    domain: ["#e74c3c", "#3498db"],
  };

  onSelect(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
}
