import { Routes } from '@angular/router';
import { AddonFormComponent } from './addon/addon-form/addon-form.component';
import { AddonListComponent } from './addon/addon-list/addon-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { MenuBuilderComponent } from './menu-builder/menu-builder.component';
import { MenuItemFormComponent } from './menu-item/menu-item-form/menu-item-form.component';
import { MenuItemListComponent } from './menu-item/menu-item-list/menu-item-list.component';

export const MenuBuilderRoutes: Routes = [{
  path: 'menu-builder',
  component: MenuBuilderComponent,
},
{
  path: 'category',
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: CategoryListComponent,
    },
    {
      path: 'add/new',
      component: CategoryFormComponent,
    },
    {
      path: 'edit/:id',
      component: CategoryFormComponent,
    },
  ],
},
{
  path: 'addon',
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: AddonListComponent,
    },
    {
      path: 'add/new',
      component: AddonFormComponent,
    },
    {
      path: 'edit/:id',
      component: AddonFormComponent,
    },
  ],
},
{
  path: 'menu-item',
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: MenuItemListComponent,
    },
    {
      path: 'add-new/:catID',
      component: MenuItemFormComponent,
    },
    {
      path: 'edit/:id',
      component: MenuItemFormComponent,
    },
  ],
}];
