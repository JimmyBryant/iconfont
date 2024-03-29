var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function setCookie(name, value, exdays) {
    var date = new Date();
    date.setDate(date.getDate() + exdays);
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + ';path=/';
};

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
};
/**
 * 判断浏览器是否支持webp
 * @returns {Boolean}
 */
 var isSupportWebp = function () {
    try {
        return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
    } catch (err) {
        return false;
    }
};
// window.onload = function () {
//     var useAgree = document.getElementById('useAgree');
//     var userConsent = document.getElementById('userConsent');
//     useAgree && useAgree.addEventListener('click', function () {
//         setCookie('user-consent', '1', 365);
//         userConsent.style.opacity = 0;
//         userConsent.style.zIndex = -1;
//         $("#home").css("bottom", "20px");
//     });
//     if (!getCookie('user-consent')) {
//         if (userConsent) {
//             userConsent.style.opacity = 1;
//             userConsent.style.zIndex = 1000;
//             $("#home").css("bottom", "60px");
//         }
//     }
//     // setCookie('user-consent', '1', 365);
// };
// $(".icon_down").click(function(){
//  $(".belong").toggleClass("belong_flex");
//  $(this).toggleClass("icon_up")
// })

var errorCDN = function(e){
    const src = e.getAttribute("data-error");
    const scriptDOM = document.createElement("script");
    scriptDOM.src =src; 
    console.warn(e,'CDN ERROR');
    document.head.appendChild(scriptDOM);
    if(e.onload){
        scriptDOM.onload = e.onload;
    }
    e.remove();
}

var jqReadyHanlder = function () {
    if (document.body.clientWidth <= 767) {
        $("#share").click(function () {
            navigator.share({
                title: 'weGame',
                text: '',
                url: location.href + '/?utm_source=game&utm_medium=share',
            })
                .then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));

        })
    }
    /**
     * 添加PWA到浏览器
     */
    let deferredPrompt;
    const addBtn = $('.home_add');
    const footerBtn = $('#home');
    footerBtn.css('display', 'none');
    var i;

    //浏览器触发Add to home 时会触发一个beforeinstallprompt事件，我们监听这个事件
    window.addEventListener('beforeinstallprompt', (e) => {

        e.preventDefault(); // 阻止浏览器的默认事件
        deferredPrompt = e; // 储存事件对象，方便在之后的按钮事件中手动触发

        $(window).scroll(function (event) {
            var winPos = $(window).scrollTop();
            if (winPos > $(window).height() && document.body.clientWidth <= 1024) {
                footerBtn.css('display', 'flex');
            }
        });

        addBtn.on('click', (e) => {

            deferredPrompt.prompt(); // 弹出Add to home 提示
            // addBtn.style.display = 'none'; // 用户点击后将按钮隐藏
            // 等待用户操作结果
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the Add to home prompt');
                }
                else {
                    console.log('User dismissed the Add to home prompt');
                }
                // 只能用一次，不管用户拒绝还是同意都不在弹出
                // deferredPrompt = null;
            });
        });

    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(() => { console.log('Service Worker Registered'); });
    }

    /**
     * do somethings when document ready 
     */
    $(function () {
        /**
         * 填充谷歌广告
         * @param id {String}
         */
        function insertGads(id, config) {
            const box = document.getElementById(id);

            if (box) {
                const ad = document.createElement('ins');
                ad.style.cssText = 'display:block;text-align:center;';
                ad.className = 'adsbygoogle ' + id;
                ad.setAttribute('data-ad-client', config.client);
                ad.setAttribute('data-ad-slot', config.slot);
                ad.setAttribute('data-full-width-responsive',true);
                // ad.setAttribute('data-ad-format','auto');
                if (config.format!='false') {
                    ad.setAttribute('data-ad-format', 'auto')
                }
                if (config.layoutKey) {
                    ad.setAttribute('data-ad-layout-key', config.layoutKey)
                }
                box.appendChild(ad);
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        }


        function renderAd() {
            // adsense js
            var ad_client = "ca-pub-7116395709201717";
            // var ad_client = "ca-pub-8841494842378633";
            $('head').append($('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">'));
            (adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: ad_client, enable_page_level_ads: true});
            switch (location.hostname) {
                default:
                    // 首页广告
                    // insertGads("home_ad_01", {client:ad_client,slot: "2855201156"});
                    // insertGads("home_ad_02", {client:ad_client,slot: "8054437383"});
                    // insertGads("home_ad_03", {client:ad_client,slot: "6741355711"});

                    // 分类页
                    insertGads("cate_ad_01", { client: ad_client, slot: "5756099183" });

                    // 详情页
                    insertGads("detail_ad_01", { client: ad_client, slot: "5756099183" });
                    insertGads("detail_ad_02", { client: ad_client, slot: "8190690833" });
                    insertGads("detail_ad_03", { client: ad_client, slot: "4251445822" });
                    insertGads("detail_ad_04", { client: ad_client, slot: "6686037477", format: "rectangle" });
                    insertGads("detail_ad_05", { client: ad_client, slot: "7339001872", format: "rectangle" });
                    // insertGads("detail_ad_04", { client: ad_client, slot: "4401202219", format: "fluid", layoutKey: "-h6-7+1j-3w+4l" });

                    // 游戏页
                    if(isMobile){
                        insertGads("play_m_ad_01", { client: ad_client, slot: "1193698331", format: 'auto' });
                    }else{
                        insertGads("play_ad_01", { client: ad_client, slot: "1193698331", format: 'auto' });
                    }                    
                    insertGads("play_ad_02", { client: ad_client, slot: "5181384119", format: isMobile?'false':'auto' });
                    insertGads("play_ad_03", { client: ad_client, slot: "1437240915" });
            }

        }    
        
        function initPage() {
            // 加载 google fonts
            const fontUrl = 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Roboto+Slab:wght@700&family=Roboto:wght@500&display=swap';
            $('head').append($('<link rel="stylesheet">').attr('href', fontUrl));

            // 加载iconfont js
            var icon_script = document.createElement('script');
            icon_script.src = 'https://cdn.jsdelivr.net/gh/JimmyBryant/iconfont@latest/iconfont.js';
            icon_script.setAttribute('data-error','/assets/iconfont/iconfont.js');
            icon_script.setAttribute('onerror','errorCDN(this)');
            document.body.append(icon_script);
            
            // 设置game-audio
            if (document.querySelector('#game_audio>iframe')) {
                $('#game_audio>iframe').attr('src', $('#game_audio>iframe').data('src'));
            }

            // 展示广告
            // renderAd();

            // 展示cookie隐私政策
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


            $(document).on("click", ".pop_li_box>.icon_close", function () {
                $(this).parent().parent().remove();
                var deletext = $(this).siblings(".pop_item").children(".pop_name").text();
                localStorage.removeItem(deletext);

                var localmark = localStorage.getItem("localmark");
                arr = localmark.substring(0, localmark.length - 1).split("/");
                // console.log(arr);
                $(arr).each(function (i, item) {
                    // console.log(arr);
                    if (arr[i] == deletext) {
                        arr.splice(jQuery.inArray(arr[i], arr), 1);
                    }
                });
                // console.log(arr);
                if (arr.length != 0) {
                    arr = arr.join('/');
                    arr = arr + '/';
                    localStorage.setItem("localmark", arr);
                } else {
                    localStorage.removeItem("localmark");
                    $(".fav_listbox").hide().siblings(".empty").show();
                }

                var numItems1 = $(".nav_li .fav_num").text();
                $(".fav_num").text(parseInt(numItems1) - 1);

            });

            $(document).click(function (event) {
                $(this).children(".dropdown-content").slideUp();
                event.stopPropagation();
            });

            $(".dropdown").click(function (event) {
                $(this).children(".dropdown-content").slideToggle();
                event.stopPropagation();
            });


            if (localStorage.localmark) {
                // console.log(arr);
                var localmark = localStorage.getItem("localmark");
                arr = localmark.substring(0, localmark.length - 1).split("/");
                // $(".num").text(arr.length);
                $(arr).each(function (i, item) {
                    // alert(arr.length);
                    $(".fav_num").text(arr.length);
                    var localjson1 = localStorage.getItem(arr[i]);
                    // console.log(localjson1);
                    var localjson1 = JSON.parse(localjson1);
                    str1 = '<li class=\"pop_li\"><div class=\"pop_li_box\">';
                    str1 += '<a href="' + localjson1.href2 + '" class=\"game_img\">';
                    str1 += '<img src="' + localjson1.img2 + '"></a>';
                    str1 += '<a href="' + localjson1.href2 + '" class=\"pop_item\"><h4 class=\"pop_name\">' + arr[i] + '</h4></a>';
                    str1 += '<svg class=\"icon_close\"><use xlink:href=\"#icon-close\"></use></svg></div></li>';

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
                    });
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
                    var img2 = $('.img_topfix>img').attr('src') || $(".gamejoy_img").attr('src');
                    // var playNum2 = "14K Plays";

                    var localjson = {
                        'href2': href2,
                        'txt2': txt2,
                        'img2': img2
                        // 'playNum2': playNum2
                    };

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

            /**
             * 创建游戏预览视频
             */
            function createPreviewVideo(src,onload){
                var video = document.createElement('video');
                video.className = 'preview';
                video.loop='loop';
                video.autoplay='autoplay';
                video.muted='muted';
                video.src = src;
                if(onload){
                    video.addEventListener('load',onload);
                }
                return video;
            }

            $('.pop_li_box>.game_img[data-preview]').hover(function(e){
                var src = $(this).data('preview');
                var video = createPreviewVideo(src);
                this.append(video);
            },function(e){
                $(this).find('video.preview').remove()
            });
        }

        initPage();
    });
};

// do something on pageLoaded
function onPageLoaded(callback){
    if(document.readyState=='complete'){
        callback&&callback();
    }else{
        window.addEventListener('load',function(){
            callback&&callback();
        })
    }
};

onPageLoaded(function () {
    // load jquery
    var jq_src = 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
    var jq_err = '/assets/js/jquery-3.6.0.min.js';
    var jq_s = document.createElement('script');
    jq_s.src = jq_src;
    jq_s.setAttribute('onerror','errorCDN(this)');
    jq_s.setAttribute('data-error',jq_err);
    jq_s.onload = function(){
        jqReadyHanlder();
    }
    document.body.appendChild(jq_s);
});

// lazyload image
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazyload"                   
});
