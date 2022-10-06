$(document).ready(function () {
    $('.profile_chatter1').on('click', function () {
        $('.chat1,.img_slider1').removeClass('hide');

        $('.chat2,.img_slider2').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
        $('.chat4,.img_slider4').addClass('hide');
        $('.chat5,.img_slider5').addClass('hide');
        $('.chat6,.img_slider6').addClass('hide');
        $('.chat7,.img_slider7').addClass('hide');
        $('.chat8,.img_slider8').addClass('hide');
    });
    $('.profile_chatter2').on('click', function () {
        $('.chat2,.img_slider2').removeClass('hide');

        $('.chat1,.img_slider1').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
        $('.chat4,.img_slider4').addClass('hide');
        $('.chat5,.img_slider5').addClass('hide');
        $('.chat6,.img_slider6').addClass('hide');
        $('.chat7,.img_slider7').addClass('hide');
        $('.chat8,.img_slider8').addClass('hide');
    });
    $('.profile_chatter3').on('click', function () {
        $('.chat3,.img_slider3').removeClass('hide');

        $('.chat4,.img_slider4').addClass('hide');
        $('.chat5,.img_slider5').addClass('hide');
        $('.chat6,.img_slider6').addClass('hide');
        $('.chat7,.img_slider7').addClass('hide');
        $('.chat8,.img_slider8').addClass('hide');
        $('.chat1,.img_slider1').addClass('hide');
        $('.chat2,.img_slider2').addClass('hide');
    });

    $('.profile_chatter4').on('click', function () {
        $('.chat4,.img_slider4').removeClass('hide');

        $('.chat5,.img_slider5').addClass('hide');
        $('.chat6,.img_slider6').addClass('hide');
        $('.chat7,.img_slider7').addClass('hide');
        $('.chat8,.img_slider8').addClass('hide');
        $('.chat1,.img_slider1').addClass('hide');
        $('.chat2,.img_slider2').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
    });

    $('.profile_chatter5').on('click', function () {
        $('.chat5,.img_slider5').removeClass('hide');

        $('.chat6,.img_slider6').addClass('hide');
        $('.chat7,.img_slider7').addClass('hide');
        $('.chat8,.img_slider8').addClass('hide');
        $('.chat1,.img_slider1').addClass('hide');
        $('.chat2,.img_slider2').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
        $('.chat4,.img_slider4').addClass('hide');
    });

    $('.profile_chatter6').on('click', function () {
        $('.chat6,.img_slider6').removeClass('hide');

        $('.chat7,.img_slider7').addClass('hide');
        $('.chat8,.img_slider8').addClass('hide');
        $('.chat1,.img_slider1').addClass('hide');
        $('.chat2,.img_slider2').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
        $('.chat4,.img_slider4').addClass('hide');
        $('.chat5,.img_slider5').addClass('hide');
    });

    $('.profile_chatter7').on('click', function () {
        $('.chat7,.img_slider7').removeClass('hide');

        $('.chat8,.img_slider8').addClass('hide');
        $('.chat1,.img_slider1').addClass('hide');
        $('.chat2,.img_slider2').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
        $('.chat4,.img_slider4').addClass('hide');
        $('.chat5,.img_slider5').addClass('hide');
        $('.chat6,.img_slider6').addClass('hide');
    });

    $('.profile_chatter8').on('click', function () {
        $('.chat8,.img_slider8').removeClass('hide');

        $('.chat1,.img_slider1').addClass('hide');
        $('.chat2,.img_slider2').addClass('hide');
        $('.chat3,.img_slider3').addClass('hide');
        $('.chat4,.img_slider4').addClass('hide');
        $('.chat5,.img_slider5').addClass('hide');
        $('.chat6,.img_slider6').addClass('hide');
        $('.chat7,.img_slider7').addClass('hide');
    });

    $('.profile-button.profile_chatter1').on('click', function () {
        $('.profile-button.profile_chatter1').addClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });
    $('.profile-button.profile_chatter2').on('click', function () {
        $('.profile-button.profile_chatter2').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });
    $('.profile-button.profile_chatter3').on('click', function () {
        $('.profile-button.profile_chatter3').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });
    $('.profile-button.profile_chatter4').on('click', function () {
        $('.profile-button.profile_chatter4').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });
    $('.profile-button.profile_chatter5').on('click', function () {
        $('.profile-button.profile_chatter5').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });

    $('.profile-button.profile_chatter6').on('click', function () {
        $('.profile-button.profile_chatter6').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });

    $('.profile-button.profile_chatter7').on('click', function () {
        $('.profile-button.profile_chatter7').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter8').removeClass('active');
    });

    $('.profile-button.profile_chatter8').on('click', function () {
        $('.profile-button.profile_chatter8').addClass('active');
        $('.profile-button.profile_chatter1').removeClass('active');
        $('.profile-button.profile_chatter2').removeClass('active');
        $('.profile-button.profile_chatter3').removeClass('active');
        $('.profile-button.profile_chatter4').removeClass('active');
        $('.profile-button.profile_chatter5').removeClass('active');
        $('.profile-button.profile_chatter6').removeClass('active');
        $('.profile-button.profile_chatter7').removeClass('active');
    });

    $('.profile_chatter1').on('click', function () {
        $('.profile_chatter1 .profile-img mark').addClass('hide');
        $('.mobile_profile_img8').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });
    $('.profile_chatter2').on('click', function () {
        $('.profile_chatter2 .profile-img mark').addClass('hide');
        $('.mobile_profile_img7').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
    });
    $('.profile_chatter3').on('click', function () {
        $('.profile_chatter3 .profile-img mark').addClass('hide');
        $('.mobile_profile_img6').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });
    $('.profile_chatter4').on('click', function () {
        $('.profile_chatter4 .profile-img mark').addClass('hide');
        $('.mobile_profile_img5').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });
    $('.profile_chatter5').on('click', function () {
        $('.profile_chatter5 .profile-img mark').addClass('hide');
        $('.mobile_profile_img4').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });
    $('.profile_chatter6').on('click', function () {
        $('.profile_chatter6 .profile-img mark').addClass('hide');

        $('.mobile_profile_img3').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });
    $('.profile_chatter7').on('click', function () {
        $('.profile_chatter7 .profile-img mark').addClass('hide');

        $('.mobile_profile_img2').removeClass('hide');
        $('.mobile_profile_img1').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });
    $('.profile_chatter8').on('click', function () {
        $('.profile_chatter8 .profile-img mark').addClass('hide');

        $('.mobile_profile_img1').removeClass('hide');
        $('.mobile_profile_img2').addClass('hide');
        $('.mobile_profile_img3').addClass('hide');
        $('.mobile_profile_img4').addClass('hide');
        $('.mobile_profile_img5').addClass('hide');
        $('.mobile_profile_img6').addClass('hide');
        $('.mobile_profile_img8').addClass('hide');
        $('.mobile_profile_img7').addClass('hide');
    });





    /*-------------------
    Responsive Devices
    ------------------- */

    $('.arrow').on('click', function () {
        $('.column1').removeClass('hiding').addClass('show_column');
        $('.column2').addClass('hiding').removeClass('showing');
        $('.column3').addClass('hiding').removeClass('showing');
        $('header .logo').addClass('showing');
        $('.arrow,.header-img').addClass('hiding');

    });

    $('.profile_chatter8,.profile_chatter7,.profile_chatter6,.profile_chatter5,.profile_chatter4,.profile_chatter3,.profile_chatter2,.profile_chatter1').on('click', function () {
        $('.column1').removeClass('show_column');
        $('.column2').removeClass('hiding');
        $('.column3').addClass('hiding');
        $('header .logo').removeClass('showing');
        $('.arrow,.header-img').removeClass('hiding');
    });

    $('.mobile_profile_img1,.mobile_profile_img2,.mobile_profile_img3,.mobile_profile_img4,.mobile_profile_img5,.mobile_profile_img6,.mobile_profile_img7,.mobile_profile_img8').on('click', function () {
        $('.column1').removeClass('show_column');
        $('.column2').removeClass('hiding');
        $('.column3').addClass('show_column').removeClass('hiding');
        $('header .logo').removeClass('showing');
        $('.arrow,.header-img').addClass('hiding');
        $('header .close').addClass('showing');
        $('.columns .column2 .input-bar').addClass('hiding');
    });

    $('header .close').on('click', function () {
        $('.column1').addClass('hiding').removeClass('showing');
        $('.column2').addClass('showing').removeClass('hiding');
        $('.column3').removeClass('show_column').addClass('hiding');
        $('header .logo').removeClass('showing');
        $('.arrow,.header-img').removeClass('hiding');
        $('header .close').removeClass('showing');
        $('.columns .column2 .input-bar').removeClass('hiding');
    });


    $('.ipad').on('click', function () {
        $('.columns .column2 .input-bar').addClass('display_none');
        $('.ipad').addClass('display_none');
        $('.close').addClass('display_block');
        $('.header-img').addClass('display_none');
       
    });

    $('header .close').on('click', function () {
        $('.columns .column2 .input-bar').removeClass('display_none');
        $('.ipad').removeClass('display_none');
        $('.close').removeClass('display_block');
        $('.header-img').removeClass('display_none');
        $('.close').addClass('hiding');
       
       
    });




});