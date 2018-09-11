import {MDCMenu} from '@material/menu';
import {MDCList} from '@material/list';
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";


const menu = new MDCMenu(document.querySelector('.mdc-menu'));
var list_items = new MDCList(document.querySelector('.mdc-list'));
list_items.singleSelection = true;
list_items.wrapFocus = true;
var list_found = list_items.getDefaultFoundation();
//list_found.setSelectedIndex(1);


const drawer = new MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});
