import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() numberOfDisplayPages: number = 5;

  @Input()
  get showFirstLastButtons(): boolean {
    return this._showFirstLastButtons;
  }
  set showFirstLastButtons(value: boolean) {
    this._showFirstLastButtons = value != null && `${value}` !== "false";
  }
  private _showFirstLastButtons = false;

  @Output() page = new EventEmitter();

  numberOfPages: number = 0;
  displayPages: Array<number> = [];
  pageIndex: number = 0;

  ngOnChanges(): void {
    this.changeDisplayPages();
  }

  changeDisplayPages(): void {
    const numberOfPages = Math.ceil(this.length / this.pageSize);
    const halfNumberOfDisplayPages = Math.floor(this.numberOfDisplayPages / 2);

    let displayPages = [];

    let startDisplayPage = this.pageIndex - halfNumberOfDisplayPages;
    if (startDisplayPage < 0) startDisplayPage = 0;

    const numberOfDisplayPages = this.numberOfDisplayPages - 1;
    let endDisplayPage = startDisplayPage + numberOfDisplayPages;

    if (endDisplayPage > numberOfPages - 1) {
      endDisplayPage = numberOfPages - 1;
      startDisplayPage = endDisplayPage - numberOfDisplayPages;
      if (startDisplayPage < 0) startDisplayPage = 0;
    }

    for (let i = startDisplayPage; i <= endDisplayPage; i++) {
      displayPages.push(i);
    }

    this.displayPages = displayPages;
    this.numberOfPages = numberOfPages;
  }

  changePage(currentPage: number): void {
    this.pageIndex = currentPage;

    this.page.emit({
      pageIndex: currentPage,
      pageSize: this.pageSize,
    });

    this.changeDisplayPages();
  }

  firstPage(): void {
    if (this.pageIndex !== 0) this.changePage(0);
  }

  lastPage(): void {
    if (this.pageIndex !== this.numberOfPages - 1)
      this.changePage(this.numberOfPages - 1);
  }

  getNumberOfPages(): number {
    return this.numberOfPages;
  }
}
