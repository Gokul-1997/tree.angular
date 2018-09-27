import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatDialogModule, MatFormFieldModule, MatAutocompleteModule, MatExpansionModule, MatIconModule, MatGridListModule, MatDividerModule, MatListModule, MatProgressSpinnerModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,MatInputModule,MatDialogModule,MatFormFieldModule, MatAutocompleteModule, MatExpansionModule, MatIconModule, MatGridListModule, MatDividerModule, MatListModule, MatProgressSpinnerModule,MatTooltipModule],
  exports: [MatButtonModule,MatInputModule,MatDialogModule,MatFormFieldModule, MatAutocompleteModule, MatExpansionModule, MatIconModule, MatGridListModule, MatDividerModule, MatListModule, MatProgressSpinnerModule,MatTooltipModule],
})
export class MaterialModule { }

