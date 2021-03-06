import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterService } from '../_services/router.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppGlobals } from '../app.global.service';
import { Title, Meta } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  //template: '<router-outlet></router-outlet>',
  templateUrl: './home-layout.component.html'
})
export class HomeLayoutComponentt implements OnInit {

  constructor(private router: Router, private location : Location, private http : Http, private title: Title, private meta: Meta, private _elRef : ElementRef, private myBtn: ElementRef, private _global: AppGlobals, private routerservice : RouterService) { }

  // array of all items to be paged
  allCategories: any[];
  allSubCategories: any[];
  allRandomData: any[];
  baseUrl : String;
  arr1 : any[];
  arr2 : any[];
  arr3 : any[];
  private post_url : any;
  private isActive : number = 1;

  metatitle: string;
  description: string;
  keyboards: string;

  ngOnInit(): void {
    this.showMenu();
    this.showRandomPost();
    this.baseUrl = this._global.baseAppUrl;

    this.title.setTitle('Coding Programmer - blog');
    this.meta.addTag({ name: 'description', content:  'Instant Apple Technical Support other Apple device like iPhone, Mac, iPad, OS Support by TechExpertizer at affordable price. Call at 1-855-602-7997 to support.'});
    this.meta.addTag({ name: 'keywords', content: 'Apple Tech Support, Support for Apple Devices, iPhone Support, iPad Support, Mac Support, OS Support' });
    this.meta.addTag({ name: 'google-site-verification', content: "e4Ffk0W6U1GrUiOtubqj-de-6q7TpVPqJ5l3ktFAhbM" });
  }

  nextNotes(val) {
    //var owl = $(this._elRef.nativeElement).find('#btn');
    //console.log(owl);
    let res : any = '';
    this._elRef.nativeElement.addEventListener('click', (event) => {
      var className = $(event.target).attr('data-tab');
      if(className) {
        res = className.split("-");
      }
      
      this.isActive = res[1];
      //alert(this.isActive);
      //console.log(className);
      //console.log(event.target);

      var target = $(className);
        
      if ($(target).is(':visible')){
        return false;
      }else{
        target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
        //$(this).addClass('active-btn');
        //console.log($(this));
        $(className).addClass('active-btn');
        target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
        target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
        $(target).fadeIn(300);
        $(target).addClass('active-tab');
      }
      
      
    });
  }

  clickPost(category_id:number, post:string){
        //console.log(this._global.baseAPIUrl +`coding/clickpost?category_id=${category_id}`);
        this.http.get(this._global.baseAPIUrl +`coding/clickpost?category_id=${category_id}`)
            .map((response: Response) => response.json())
            .subscribe(data => {
                
                // set items to json response
                this.post_url = data.post_url+'/post/'+post;
                //console.log(data);
                this.location.replaceState('/'); /*relativeTo: this.route,*/ 
                this.router.navigate([this.post_url], {replaceUrl:true});
                //this.router.navigate(['/', data.post_url, 'post', post], {relativeTo: this.route});
            });
    }

  showMenu() {
    this.routerservice.getCategories().subscribe(category => {
      //console.log(category);
      if (category.status == true) {
        //console.log('hi');
        this.allCategories = category[0];
        //this.allSubCategories = category.allCategories.subcategory;
        //console.log(this.allCategories);
      } else {
        //console.log('bye menu');
        //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        // navigate the user back to the about page
        //this.router.navigate(['/home']);
        return false;
      }
    });
  }

  showRandomPost(){
    this.routerservice.postRandom().subscribe(randomdata => {
      //console.log(randomdata);
      if (randomdata) {
        //console.log('hi');
        this.allRandomData = randomdata;
        var chunkify = this.chunkify(this.allRandomData, 3, true);

        this.arr1 = chunkify[0];
        this.arr2 = chunkify[1];
        this.arr3 = chunkify[2];
        //this.allSubCategories = category.allCategories.subcategory;
        //console.log(pp);
      } else {
        //console.log('bye menu');
        //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        // navigate the user back to the about page
        //this.router.navigate(['/home']);
        return false;
      }
    });
  }

  chunkify(a, n, balanced) {
    
    if (n < 2)
        return [a];

    var len = a.length,
            out = [],
            i = 0,
            size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
  }


  ngAfterViewInit() {

    //Hide Loading Box (Preloader)
    function handlePreloader() {
      if($('.preloader').length){
        $('.preloader').delay(200).fadeOut(500);
      }
    }
    
    
    //Hide Loading Box (Preloader)
    if($('.main-slider-six .default-tab-box .tab-btns').length){
      $('.main-slider-six .default-tab-box .tab-btns').mCustomScrollbar();
    }
    
    
    //Update Header Style and Scroll to Top
    function headerStyle() {
      if($('.main-header').length){
        var windowpos = $(window).scrollTop();
        var siteHeader = $('.main-header');
        var scrollLink = $('.scroll-to-top');
        if (windowpos >= 250) {
          siteHeader.addClass('fixed-header');
          scrollLink.fadeIn(300);
        } else {
          siteHeader.removeClass('fixed-header');
          scrollLink.fadeOut(300);
        }
      }
    }
    
    headerStyle();
    
    
    //Submenu Dropdown Toggle
    if($('.main-header li.dropdown ul').length){
      $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
      
      //Dropdown Button
      $('.main-header li.dropdown .dropdown-btn').on('click', function() {
        $(this).prev('ul').slideToggle(500);
      });
      
      //Disable dropdown parent link
      $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
        e.preventDefault();
      });
    }
    
    
    //Hidden Bar Menu Config
    function hiddenBarMenuConfig() {
      var menuWrap = $('.hidden-bar .side-menu');
      // hidding submenu 
      menuWrap.find('.dropdown').children('ul').hide();
      // toggling child ul
      menuWrap.find('li.dropdown > a').each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          $(this).parent('li.dropdown').children('ul').slideToggle();
    
          // adding class to item container
          $(this).parent().toggleClass('open');
    
          return false;
    
        });
      });
    }
    
    hiddenBarMenuConfig();
    
    
    //Hidden Sidebar
    if ($('.hidden-bar').length >=0) {
      //alert($('.hidden-bar').length);
      var hiddenBar = $('.hidden-bar');
      var hiddenBarOpener = $('.hidden-bar-opener');
      var hiddenBarCloser = $('.hidden-bar-closer');
      $('.hidden-bar-wrapper').mCustomScrollbar();
      
      //Show Sidebar
      hiddenBarOpener.on('click', function () {
        //alert(hiddenBarOpener);
        hiddenBar.addClass('visible-sidebar');
      });
      
      //Hide Sidebar
      hiddenBarCloser.on('click', function () {
        hiddenBar.removeClass('visible-sidebar');
      });
    }
    
    
    //Panels Toggle (Shopping Cart Page)
    if ($('.toggle-panel').length) {
      var targetPanel = $('.toggle-content');
      
      //Show Panel
      $('.toggle-panel').on('click', function () {
        $(this).toggleClass('active-panel');
        $(this).next(targetPanel).fadeToggle(300);
      });
    }
    
    
    //Single Item Carousel
    if ($('.single-item-carousel').length) {
      $('.single-item-carousel').owlCarousel({
        loop:true,
        margin:4,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        /*animateOut: 'fadeOut',
            animateIn: 'fadeIn',*/
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:1
          },
          1024:{
            items:1
          },
          1200:{
            items:1
          },
          1300:{
            items:1
          }
        }
      });        
    }
    
    
    //Single Item Carousel
    if ($('.economics-items-carousel').length) {
      $('.economics-items-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:1
          },
          1024:{
            items:1
          },
          1200:{
            items:1
          },
          1300:{
            items:1
          }
        }
      });        
    }
    
    
    //Three Item Carousel
    if ($('.three-item-carousel').length) {
      $('.three-item-carousel').owlCarousel({
        loop:true,
        margin:5,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        /*animateOut: 'fadeOut',
            animateIn: 'fadeIn',*/
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:2
          },
          1024:{
            items:3
          },
          1200:{
            items:3
          },
          1300:{
            items:3
          }
        }
      });        
    }
    
    
    //Three Item Carousel
    if ($('.related-item-carousel').length) {
      $('.related-item-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:2
          },
          1024:{
            items:3
          },
          1200:{
            items:3
          },
          1300:{
            items:3
          }
        }
      });        
    }
    
    //Three Item Carousel
    if ($('.main-three-item-carousel').length) {
      $('.main-three-item-carousel').owlCarousel({
        loop:true,
        margin:50,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:2
          },
          1024:{
            items:3
          },
          1200:{
            items:3
          }
        }
      });        
    }
    
    
    //Three Item Carousel
    if ($('.four-item-carousel').length) {
      $('.four-item-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        /*animateOut: 'fadeOut',
            animateIn: 'fadeIn',*/
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:2
          },
          1024:{
            items:3
          },
          1200:{
            items:4
          }
        }
      });        
    }
    
    
    //Mega Menu Carousel
    if ($('.mega-menu-carousel').length) {
      $('.mega-menu-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        smartSpeed: 700,
        autoplay: 8000,
        navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          800:{
            items:2
          },
          1024:{
            items:4
          },
          1200:{
            items:4
          }
        }
      });        
    }
    
    /*$('.tab-btn').on('click', function() {
      alert('testclick clicked');
    });*/
    //Tabs Box
    /*if($('.tabs-box').length){ //alert($('.tabs-box').length);
      $('.tab-btn').on('click', function(e) { alert('hi');
        e.preventDefault();
        alert('hi');
        var target = $($(this).attr('data-tab'));
        alert($(this).attr('data-tab'));
        if ($(target).is(':visible')){
          return false;
        }else{
          target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
          $(this).addClass('active-btn');
          target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
          target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
          $(target).fadeIn(300);
          $(target).addClass('active-tab');
        }
      });
    }*/
    
    
    // Product Carousel Slider
    if ($('.main-slider-five .image-carousel').length && $('.main-slider-five .thumbs-carousel').length) {

      var $sync1 = $(".main-slider-five .image-carousel"),
        $sync2 = $(".main-slider-five .thumbs-carousel"),
        flag = false,
        duration = 500;

        $sync1
          .owlCarousel({
            loop:true,
            items: 1,
            margin: 0,
            nav: true,
            navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000
          })
          .on('changed.owl.carousel', function (e) {
            if (!flag) {
              flag = false;
              $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
              flag = false;
            }
          });

        $sync2
          .owlCarousel({
            loop:true,
            margin: 0,
            items: 1,
            nav: false,
            navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
            dots: false,
            center: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
              0:{
                      items:1,
                      autoWidth: false
                  },
                  400:{
                      items:2,
                      autoWidth: false
                  },
                  600:{
                      items:3,
                      autoWidth: false
                  },
                  900:{
                      items:4,
                      autoWidth: false
                  },
                  1400:{
                      items:4,
                      autoWidth: false
                  },
              1600:{
                      items:5,
                      autoWidth: false
                  }
              },
          })
          
      .on('click', '.owl-item', function () {
        $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
      })
      .on('changed.owl.carousel', function (e) {
        if (!flag) {
          flag = true;    
          $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
          flag = false;
        }
      });
    }  
    
    
    // Product Carousel Slider
    if ($('.shop-page .image-carousel').length && $('.shop-page .thumbs-carousel').length) {

      var $sync3 = $(".shop-page .image-carousel"),
        $sync4 = $(".shop-page .thumbs-carousel"),
        flags = false,
        durations = 500;

        $sync3
          .owlCarousel({
            loop:true,
            items: 1,
            margin: 0,
            nav: false,
            navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000
          })
          .on('changed.owl.carousel', function (e) {
            if (!flags) {
              flags = false;
              $sync4.trigger('to.owl.carousel', [e.item.index, durations, true]);
              flags = false;
            }
          });

        $sync4
          .owlCarousel({
            loop:true,
            margin: 10,
            items: 1,
            nav: false,
            navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
            dots: false,
            center: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
              0:{
                      items:2,
                      autoWidth: false
                  },
                  400:{
                      items:3,
                      autoWidth: false
                  },
                  600:{
                      items:4,
                      autoWidth: false
                  },
                  900:{
                      items:5,
                      autoWidth: false
                  },
                  1000:{
                      items:6,
                      autoWidth: false
                  }
              },
          })
          
      .on('click', '.owl-item', function () {
        $sync3.trigger('to.owl.carousel', [$(this).index(), durations, true]);
      })
      .on('changed.owl.carousel', function (e) {
        if (!flags) {
          flags = true;    
          $sync3.trigger('to.owl.carousel', [e.item.index, durations, true]);
          flags = false;
        }
      });

    }
    
    
    //Sortable Masonary with Filters
    function enableMasonry() {
      if($('.sortable-masonry').length){
    
        var winDow = $(window);
        // Needed variables
        var $container=$('.sortable-masonry .items-container');
        var $filter=$('.filter-btns');
    
        $container.isotope({
          filter:'*',
           masonry: {
            columnWidth : '.col-md-3.masonry-item'
           },
          animationOptions:{
            duration:500,
            easing:'linear'
          }
        });
        
    
        // Isotope Filter 
        $filter.find('li').on('click', function(){
          var selector = $(this).attr('data-filter');
    
          try {
            $container.isotope({ 
              filter  : selector,
              animationOptions: {
                duration: 500,
                easing  : 'linear',
                queue  : false
              }
            });
          } catch(err) {
    
          }
          return false;
        });
    
    
        winDow.bind('resize', function(){
          var selector = $filter.find('li.active').attr('data-filter');

          $container.isotope({ 
            filter  : selector,
            animationOptions: {
              duration: 500,
              easing  : 'linear',
              queue  : false
            }
          });
        });
    
    
        var filterItemA  = $('.filter-btns li');
    
        filterItemA.on('click', function(){
          var $this = $(this);
          if ( !$this.hasClass('active')) {
            filterItemA.removeClass('active');
            $this.addClass('active');
          }
        });
      }
    }
    
    enableMasonry();
    
    
    //Progress Bar / Levels
    if($('.skill-progress .progress-box .bar-fill').length){
      $(".progress-box .bar-fill").each(function() {
        var progressWidth = $(this).attr('data-percent');
        $(this).css('width',progressWidth+'%');
        //$(this).parents('.progress-box').children('.percent').html(progressWidth+'%');
      });
    }

    
    //LightBox / Fancybox
    if($('.lightbox-image').length) {
      $('.lightbox-image').fancybox({
        openEffect  : 'fade',
        closeEffect : 'fade',
        helpers : {
          media : {}
        }
      });
    }
    
    
    // Scroll to a Specific Div
    if($('.scroll-to-target').length){
      $(".scroll-to-target").on('click', function() {
        var target = $(this).attr('data-target');
         // animate
         $('html, body').animate({
           scrollTop: $(target).offset().top
         }, 1000);
    
      });
    }
    
    //Contact Form Validation
    if($('#contact-form').length){
      $('#contact-form').validate({
        rules: {
          name: {
            required: true
          },
          email: {
            required: true
          },
          phone: {
            required: true
          },
          message: {
            required: true
          }
        }
      });
    }
    
    
    // Elements Animation
    /*if($('.wow').length){
      var wow = new WOW(
        {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       false,       // trigger animations on mobile devices (default is true)
        live:         true       // act on asynchronously loaded content (default is true)
        }
      );
      wow.init();
    }*/

    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */
      
      $(window).on('scroll', function() {
        headerStyle();
      });
      
    /* ==========================================================================
       When document is loaded, do
       ========================================================================== */
      
      /*$(window).on('onhashchange', function() {
        handlePreloader();
      });*/

  }
}
