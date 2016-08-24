webpackJsonp([1],{

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(11);
	var list_component_1 = __webpack_require__(477);
	var list_routes_1 = __webpack_require__(478);
	// Feature modules.
	var shared_module_1 = __webpack_require__(479);
	var material_module_1 = __webpack_require__(480);
	// Angular 2 Localization.
	var angular2localization_1 = __webpack_require__(339);
	var ListModule = (function () {
	    function ListModule() {
	    }
	    ListModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                list_routes_1.routing,
	                shared_module_1.SharedModule,
	                material_module_1.MaterialModule,
	                angular2localization_1.LocaleModule,
	                angular2localization_1.LocalizationModule.forRoot() // New instance of LocalizationService.
	            ],
	            declarations: [list_component_1.ListComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ListModule);
	    return ListModule;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ListModule;


/***/ },

/***/ 477:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(11);
	// Async methods.
	/*import { Observer } from 'rxjs/Observer';
	import { Observable } from 'rxjs/Observable';*/
	// Services.
	var angular2localization_1 = __webpack_require__(339);
	var ListComponent = (function (_super) {
	    __extends(ListComponent, _super);
	    // Async methods.
	    /*get ASYNC_DATA(): Observable<Array<Data>> {
	
	        return new Observable<any>((observer: Observer<Array<Data>>) => {
	
	            observer.next(this.DATA);
	            observer.complete();
	
	        });
	
	    }*/
	    function ListComponent(locale, localization) {
	        _super.call(this, locale, localization);
	        this.locale = locale;
	        this.localization = localization;
	        // Array that contains the columns to look for.
	        this.keyNames = [];
	        // Initializes LocalizationService: asynchronous loading.
	        this.localization.translationProvider('./resources/locale-list-'); // Required: initializes the translation provider with the given path prefix.
	        this.localization.updateTranslation(); // Need to update the translation.
	        this.intlSupport = angular2localization_1.IntlSupport.Collator(this.locale.getCurrentLanguage());
	        this.DATA = this.loadData();
	        this.keyNames.push('position');
	        this.keyName = "";
	        this.order = "";
	        this.s = "";
	    }
	    ListComponent.prototype.orderBy = function (keyName, order) {
	        if (this.keyName != keyName || this.order != order) {
	            this.DATA = this.localization.sort(this.DATA, keyName, order, "", { sensitivity: 'variant' });
	            // Async methods.
	            /*this.localization.sortAsync(this.DATA, keyName, order, "", { sensitivity: 'variant' }).forEach(
	    
	                // Next.
	                (list: Array<Data>) => { this.DATA = list }
	    
	            );*/
	            // Stores parameters.
	            this.keyName = keyName;
	            this.order = order;
	        }
	    };
	    ListComponent.prototype.search = function (s) {
	        // Initializes the data if the search string is shorter than the previous.
	        if (s.length < this.s.length) {
	            this.DATA = this.localization.search(s, this.loadData(), this.keyNames, { usage: 'search', sensitivity: 'base' });
	            // Keeps sorting.
	            this.orderBy(this.keyName, this.order);
	        }
	        else {
	            // Continues the search with the entered string.
	            this.DATA = this.localization.search(s, this.DATA, this.keyNames, { usage: 'search', sensitivity: 'base' });
	        }
	        // Async methods.
	        /*this.DATA = new Array<Data>();
	
	        this.localization.searchAsync(s, this.loadData(), this.keyNames, { usage: 'search', sensitivity: 'base' }).forEach(
	
	            // Next.
	            (data: Data) => { this.DATA.push(data) }
	
	        );*/
	        // Stores the parameter.
	        this.s = s;
	    };
	    ListComponent.prototype.reset = function () {
	        // Initializes the data.
	        this.DATA = this.loadData();
	        // Keeps sorting.
	        this.orderBy(this.keyName, this.order);
	    };
	    ListComponent.prototype.loadData = function () {
	        // Mock data.    
	        var DATA = new Array();
	        var data = new Data();
	        data.name = "Tiger Nixon";
	        data.position = "System Architect";
	        data.salary = 320800;
	        data.startDate = new Date("2011/04/25");
	        DATA.push(data);
	        data = new Data();
	        data.name = "Garrett Winters";
	        data.position = "Accountant";
	        data.salary = 170750;
	        data.startDate = new Date("2011/07/25");
	        DATA.push(data);
	        data = new Data();
	        data.name = "Ashton Cox";
	        data.position = "Junior Technical Author";
	        data.salary = 86000;
	        data.startDate = new Date("2009/01/12");
	        DATA.push(data);
	        data = new Data();
	        data.name = "Cedric Kelly";
	        data.position = "Senior Javascript Developer";
	        data.salary = 433060;
	        data.startDate = new Date("2012/03/29");
	        DATA.push(data);
	        data = new Data();
	        data.name = "Airi Satou";
	        data.position = "Accountant";
	        data.salary = 162700;
	        data.startDate = new Date("2008/11/28");
	        DATA.push(data);
	        return DATA;
	    };
	    ListComponent = __decorate([
	        core_1.Component({
	            templateUrl: './app/list.component.html'
	        }), 
	        __metadata('design:paramtypes', [angular2localization_1.LocaleService, angular2localization_1.LocalizationService])
	    ], ListComponent);
	    return ListComponent;
	}(angular2localization_1.Locale));
	exports.ListComponent = ListComponent;
	var Data = (function () {
	    function Data() {
	    }
	    return Data;
	}());
	exports.Data = Data;


/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(413);
	// Components.
	var list_component_1 = __webpack_require__(477);
	var routes = [
	    { path: '', component: list_component_1.ListComponent }
	];
	exports.routing = router_1.RouterModule.forChild(routes);


/***/ }

});
//# sourceMappingURL=1.chunk.js.map