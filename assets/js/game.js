// $(function() {
//       $('main').click(function() {
//            $(".playOnphone .mark").hide();
//            // event.stopPropagation();
//        });

//       $('.playOnphone .mark').click(function() {
//            $(this).show();
//            event.stopPropagation();
//        });

//        $('.playOnphone .playIt')
//            .css("cursor", "pointer")
//            .click(function() {
//                $(".playOnphone .mark").toggle();
//                event.stopPropagation();
//            });
//    });


//  var Lhref = window.location.href;

//  $("#like").click(function(){
//    var localhref = localStorage.getItem(Lhref);
//      $(this).toggleClass("remove_like").toggleClass("click_like");
//      if (localhref) {
// localStorage.removeItem(Lhref);
//      }else{
//        localStorage.setItem(Lhref, "like");
//      }
//  })

//  jQuery(document).ready(function() {
//    var localhref = localStorage.getItem(Lhref);
//      if (localhref) {
// $("#like").addClass("remove_like").removeClass("click_like");
//      }else{
// $("#like").removeClass("remove_like").addClass("click_like");
//      }
//  })

// function ClickAjax(){
//  var href = window.location.href;
//  var params={"game":"among-them-bubble-shooter","ref":href};
//        $.ajax({
//            type: "POST",
//            url: "/support/clicks",
//            dataType: "json",
//            crossDomain: true,
//            data: params,
//            success: function(result){
//                    console.log(result);
//                }
//            });
//    }
function setCookie(name, value, exdays) {
    var date = new Date();
    date.setDate(date.getDate() + exdays);
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + ';path=/';
}
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}
window.onload = function () {
    var useAgree = document.getElementById('useAgree');
    var userConsent = document.getElementById('userConsent');
    useAgree && useAgree.addEventListener('click', function () {
        setCookie('user-consent', '1', 365);
        userConsent.style.opacity = 0;
        userConsent.style.zIndex = -1;
        $("#home").css("bottom", "20px");
    });
    if (!getCookie('user-consent')) {
        if (userConsent) {
            userConsent.style.opacity = 1;
            userConsent.style.zIndex = 1000;
            $("#home").css("bottom", "60px");
        }
    }
    // setCookie('user-consent', '1', 365);
};
// $(".icon_down").click(function(){
//  $(".belong").toggleClass("belong_flex");
//  $(this).toggleClass("icon_up")
// })

if (document.body.clientWidth <= 767) {
    $("#share").click(function () {
        navigator.share({
            title: 'gamejoystick',
            text: '',
            url: location.href + '/?utm_source=game&utm_medium=share',
        })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));

    })
}
/**
 * 添加到主屏幕
 */
let deferredPrompt; 
const addBtn = document.querySelectorAll('.home_add'); 
const footerBtn = document.querySelector('#home'); 
footerBtn.style.display = 'none';
var i;

//浏览器触发Add to home 时会触发一个beforeinstallprompt事件，我们监听这个事件
window.addEventListener('beforeinstallprompt', (e) => { 
  console.log(e.platforms);
  e.preventDefault(); // 阻止浏览器的默认事件
  deferredPrompt = e; // 储存事件对象，方便在之后的按钮事件中手动触发
  
  $(window).scroll(function(event){
    var winPos = $(window).scrollTop();
    if (winPos > $(window).height() && document.body.clientWidth <= 1024) {
      footerBtn.style.display = 'flex';
    }
  });
  for (i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', (e) => { 
      
      deferredPrompt.prompt(); // 弹出Add to home 提示
      // addBtn.style.display = 'none'; // 用户点击后将按钮隐藏
        // 等待用户操作结果
      deferredPrompt.userChoice.then((choiceResult) => { 
      if (choiceResult.outcome === 'accepted') { 
        console.log('User accepted the Add to home prompt'); } 
      else { 
        console.log('User dismissed the Add to home prompt'); } 
       // 只能用一次，不管用户拒绝还是同意都不在弹出
      // deferredPrompt = null;
      }); 
    }); 
  }
});

$(function () {
    // lazyload images
    lazyload();
    /**
     * 填充谷歌广告
     * @param id {String}
     */
    function insertGads(id, client, slot) {
        const box = document.getElementById(id);
        const ad = document.createElement('div');
        if (box) {
            ad.style.cssText = 'text-align:center;';

            ad.innerHTML = '<ins class="adsbygoogle '
            + id            
            +'" style="display:inline-block;width:100%;" data-ad-client="'
            + client
            + '" data-ad-slot="'
            + slot
            + '" ></ins>'
            

            box.appendChild(ad);
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
    // 首页广告
    insertGads("home_ad_01", "ca-pub-2994572689024438", "2855201156");
    insertGads("home_ad_02", "ca-pub-2994572689024438", "8054437383");
    insertGads("home_ad_03", "ca-pub-2994572689024438", "6741355711");

    // 分类页
    insertGads("cate_ad_01", "ca-pub-2994572689024438", "6741355711");

    // 详情页
    insertGads("detail_ad_01", "ca-pub-2994572689024438", "7317190342");
    insertGads("detail_ad_02", "ca-pub-2994572689024438", "6004108672");
    insertGads("detail_ad_03", "ca-pub-2994572689024438", "9175947364");

    // 游戏页
    insertGads("play_ad_01", "ca-pub-2994572689024438", "7317190342");
    insertGads("play_ad_02", "ca-pub-2994572689024438", "6004108672",false);
    insertGads("play_ad_03", "ca-pub-2994572689024438", "9175947364");

    $('#mobile-right').click(function () {
        $("#mobile-menu").css("left", "0");
    });
    $('.similargames_title_close').click(function () {
        $("#mobile-menu").css("left", "-100%");
    });

    $('.gameplug_close').click(function () {
        $("#gameplug").hide();
    });

    $("#menu").click(function () {
        $(".hd-menu-box").slideToggle();
    });
    $(document).on("click", ".fullscreen", function () {
        let fullarea = document.getElementById('game');
        // if (hasMove1 != true) {
        if (typeof (document.fullscreenElement) != 'undefined') {
            // alert(document.fullscreenElement);
            if (document.fullscreenElement == null) {
                if (fullarea.requestFullscreen) {
                    fullarea.requestFullscreen();
                } else if (fullarea.webkitRequestFullScreen) {
                    fullarea.webkitRequestFullScreen();
                } else if (fullarea.mozRequestFullScreen) {
                    fullarea.mozRequestFullScreen();
                } else if (fullarea.msRequestFullscreen) {
                    fullarea.msRequestFullscreen();
                }
                $("#game").addClass("intro");
            } else {
                $("#game").removeClass("intro")
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        } else {
            // alert("move");
            $(".icon_full").toggle();
            $(".icon_nimi").toggle();
            $("#game").toggleClass("intro").toggleClass("intros");
        }
        // }

    });
    $(document).click(function (event) {
        $(this).children(".dropdown-content").slideUp()
        event.stopPropagation();
    });
    $("#joy_start").click(function () {
        // //  $("#game").height("px");
        // 
        var gameSrc = $("#game").attr("data-gamesrc");

        $("#game").append("<iframe id=\"game-frame\" src=\"\" style=\"width: 0px; height: 0; min-width: 100%; min-height: 100%; border: 0px; visibility: visible;\"></iframe>");
        $("#game-frame").attr("src", gameSrc);
        $(".game_innerbox").remove();
        $(".game_bg").remove();

        function resize() {
            var iframeHeight = $("#game-frame").contents().find("html").height();
            console.log($("#game-frame").contents().find("html").height());

            // iframeHeight = iframeHeight > 400 ? iframeHeight: 350;
            //  if(document.body.clientWidth > 767){
            //  $("#game").height(iframeHeight);
            //  }
        }
        setTimeout(resize, 500);


    });
    $(".dropdown").click(function (event) {
        $(this).children(".dropdown-content").slideToggle();
        event.stopPropagation();
    })

    function load() {
        $(".loading").remove();
        $(".loadend").show();
    }
    setTimeout(load, 2000);


    if (localStorage.localmark) {
        // console.log(arr);
        var localmark = localStorage.getItem("localmark");
        arr = localmark.substring(0, localmark.length - 1).split("/");
        // $(".num").text(arr.length);
        $(arr).each(function (i, item) {
            // alert(arr.length);
            $(".fav_num").text(arr.length);
            var localjson1 = localStorage.getItem(arr[i]);
            console.log(localjson1);
            var localjson1 = JSON.parse(localjson1);
            str1 = '<li class=\"pop_li\"><div class=\"pop_li_box\">';
            str1 += '<a href="' + localjson1.href2 + '" class=\"game_img\">';
            str1 += '<img src="' + localjson1.img2 + '"></a>';
            str1 += '<a href="' + localjson1.href2 + '" class=\"pop_item\"><h4 class=\"pop_name\">' + arr[i] + '</h4></a>';
            str1 += '<svg class=\"icon_close\"><use xlink:href=\"#icon_close\"></use></svg></div></li>';

            $("#fav_list").append(str1);
            $(".fav_listbox").show().siblings(".empty").hide();

            var aa = $(".game_title").text();

            if (arr[i] == aa) {
                $("#favorite").addClass("remove_fav").removeClass("click_fav");
            }
        });
    }


    $("#favorite").click(function () {
        if ($(this).hasClass("remove_fav")) {
            var removeName = $(".game_title").text();
            localStorage.removeItem(removeName);

            var localmark = localStorage.getItem("localmark");
            arr = localmark.substring(0, localmark.length - 1).split("/");
            $(arr).each(function (i, item) {
                if (arr[i] == removeName) {
                    arr.splice(jQuery.inArray(arr[i], arr), 1);
                }
            })
            if (arr.length != 0) {
                arr = arr.join('/');
                arr = arr + '/';
                localStorage.setItem("localmark", arr);
            } else {
                localStorage.removeItem("localmark");
            }

            // alert(numItems);
            var numItems = $(".nav_li .fav_num").text();
            $(".fav_num").text(parseInt(numItems) - 1);

        } else {
            var txt2 = $(".game_title").text();
            var href2 = location.href;
            var img2 = $(".img_topfix>img").attr('src');
            // var playNum2 = "14K Plays";

            var localjson = {
                'href2': href2,
                'txt2': txt2,
                'img2': img2
                // 'playNum2': playNum2
            }
            var json = JSON.stringify(localjson);

            localStorage.setItem(txt2, json);

            var Markf = '';

            if (localStorage.localmark) {
                var Markf = localStorage.getItem("localmark");
                Markf += txt2 + '/';
            } else {
                Markf = txt2 + '/';
            }
            localStorage.setItem("localmark", Markf);

            var numItems = $(".nav_li .fav_num").text();
            $(".fav_num").text(parseInt(numItems) + 1);
        }


        $(this).toggleClass("remove_fav").toggleClass("click_fav");

    });


});