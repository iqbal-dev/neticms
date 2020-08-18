/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//function typeEffect(element, speed) {
//        var text = element.innerHTML;
//        element.innerHTML = "";
//
//        var i = 0;
//        var timer = setInterval(function() {
//    if (i < text.length) {
//      element.append(text.charAt(i));
//      i++;
//    } else {
//      clearInterval(timer);
//    }
//  }, speed);
//}
//
//
//// application
//var speed = 75;
//var h1 = document.querySelector('label');
////        var p = document.querySelector('p');
//var delay = h1.innerHTML.length * speed + speed;
//
//// type affect to header
//typeEffect(h1, speed);
//
//
//// type affect to body
////        setTimeout(function(){
////          p.style.display = "inline-block";
////          typeEffect(p, speed);
////        }, delay);



// set up text to print, each item in array is new line







//var noticeTxt = document.getElementsByClassName("notdetls");
//
////console.log(noticeTxt)
////console.log(noticeTxt[1].innerText)
////console.log(noticeTxt[2].innerText)
//
//var aText = new Array(noticeTxt[0].innerText, noticeTxt[1].innerText, noticeTxt[2].innerText);
//
////console.log(aText)
//
//var iSpeed = 50; // time delay of print out
//var iIndex = 0; // start printing array at this posision
//var iArrLength = aText[0].length; // the length of the text array
//var iScrollAt = 20; // start scrolling up at this many lines
// 
//var iTextPos = 0; // initialise text position
//var sContents = ''; // initialise contents variable
//var iRow; // initialise current row
// 
//function typewriter(){
//    noticeTxt[0].innerText='';
//    noticeTxt[1].innerText='';
//    noticeTxt[2].innerText='';
//    sContents =  ' ';
//    iRow = Math.max(0, iIndex-iScrollAt);
//    var destination = document.getElementById("typedtext");
// 
//    while ( iRow < iIndex ) {
//        sContents += aText[iRow++]; //+ ' | '
//    }
//    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
//    if ( iTextPos++ == iArrLength ) {
//        iTextPos = 0;
//        iIndex++;
//        aText[iIndex-1] = '';
//        if ( iIndex != aText.length ) {
//            iArrLength = aText[iIndex].length;
//            setTimeout("typewriter()", 4000);
//        }
//    } 
//    else {
//        setTimeout("typewriter()", iSpeed);
//    }
// 
//}
//
//
//typewriter();









var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

$(document).ready(function(){
    var noticeTxt = document.getElementsByClassName("notdetls-top");
    
    
    var elements1 = document.getElementsByClassName('typewrite')[0];
    let innerData = ''
    for (var i=0; i<noticeTxt.length; i++) {
        
        if(i == 0){
            innerData += '['
        }
        if ( i == noticeTxt.length-1 ){
            innerData += '"' + noticeTxt[i].innerText + '"] '
        }else{
            innerData += '"' + noticeTxt[i].innerText + '", ';
        }
    }
    
    elements1.setAttribute("data-type", innerData );
    
    for (var i=0; i<noticeTxt.length; i++) {
        
        noticeTxt[i].style.display = "none";
    }
    
    var elements = document.getElementsByClassName('typewrite');
    
//    console.log("elements:::::::::", elements)
    
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
    
    $('#topbar-sidebar-button').click(function(){
        $(".advertisement-section").toggle();
      });
});