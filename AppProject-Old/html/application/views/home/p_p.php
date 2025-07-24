<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title  -->
    <title>Upstars</title>

    <!-- Favicon  -->
    <link rel="icon" href="<?php echo base_url();?>assets/img/favicon.png">

    <!-- ***** All CSS Files ***** -->

    <!-- Style css -->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/style.css">

    <!-- Skin css -->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/skin.css">

    <!-- Responsive css -->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/responsive.css">

</head>

<body class="homepage-9" style=" background-image: url(assets/img/bg-1-2.png);">
    <!--====== Preloader Area Start ======-->
    <div id="loader">
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </div>
    <!--====== Preloader Area End ======-->


    <!--====== Scroll To Top Area Start ======-->
    <div id="scrollUp" title="Scroll To Top">
        <i class="fas fa-arrow-up"></i>
    </div>
    <!--====== Scroll To Top Area End ======-->

    <div class="main">
        <!-- ***** Header Start ***** -->
        <header class="navbar navbar-sticky navbar-expand-lg navbar-dark">
            <div class="container position-relative">
                <a class="navbar-brand" href="<?php echo base_url();?>">
                    <img class="navbar-brand-regular" src="<?php echo base_url();?>assets/img/logo/logo-white.png" alt="brand-logo" width="150">
                    <img class="navbar-brand-sticky" src="<?php echo base_url();?>assets/img/logo/logo.png" alt="sticky brand-logo" width="150">
                </a>
                <button class="navbar-toggler d-lg-none" type="button" data-toggle="navbarToggler" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-inner">
                    <!--  Mobile Menu Toggler -->
                    <button class="navbar-toggler d-lg-none" type="button" data-toggle="navbarToggler" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <nav>
                        <ul class="navbar-nav" id="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link scroll" href="<?php echo base_url('home/index');?>#home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="<?php echo base_url();?>#about">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url('home/product');?>">Product</a>
                            </li>
                            <li class="nav-item">
                           <a class="nav-link scroll" href="<?php echo base_url();?>#services">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="<?php echo base_url();?>#astrology">Astrology</a>
                            </li>
                             <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url('home/blog');?>">Blog</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="<?php echo base_url();?>#partner-registration">Partner Registration</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="<?php echo base_url();?>#contact">Contact</a>
                            </li>
                           
                        </ul>
                         <!--  <ul class="navbar-nav" id="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#services">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#about">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#how">How It Work</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#screenshots">Screenshots</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#faq">FAQ's</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll" href="#contact">Contact</a>
                            </li>
                          <li class="nav-item">
                                 <div class="dropdown">
  <a class="dropdown-toggle nav-link pb-0" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Join As
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="<?php echo base_url();?>home/astrologer_registration">Astrologer</a>
    <a class="dropdown-item" href="<?php echo base_url();?>home/purohit_registration">Purohit</a>
    <a class="dropdown-item" href="<?php echo base_url();?>home/teacher_registration">Teacher</a>
    <a class="dropdown-item" href="http://139.59.67.166/astro_bharat_webs/home/company_registration">Company</a>
  </div>
</div>
                            </li> 
                        </ul>-->
                    </nav>
                </div>
            </div>
        </header>
        <!-- ***** Header End ***** -->

        <!-- ***** Welcome Area Start ***** -->
       <!--  <section id="home" class="section welcome-area bg-overlay bg-inherit overflow-hidden d-flex align-items-center">
            <div class="container">
                <div class="row align-items-center">
                   
                    <div class="col-12 col-md-7 col-lg-6">
                        <div class="welcome-intro">
                            <h1 class="text-gradient">Astrology Re-enginered</h1>
                            <p class="mt-4">India's most ingenious app based Platform for astrology practice.</p>
<p class="mt-2">Guide millions of people to achieve their objectives in life.</p>
                           
                            <div class="button-group store-buttons d-flex flex-wrap mb-5">
                                <a href="#">
                                    <img src="assets/img/googleplay.png">
                                </a>
                               <a href="#">
                                    <img src="assets/img/appstore.png">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-5 col-lg-6">
                        
                        <div class="welcome-thumb text-center mx-auto">
                            <img src="assets/img/welcome/welcome-mockup.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="circle-box">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </section> -->
        <!-- ***** Welcome Area End ***** -->


        

         <!-- ***** Service Area Start ***** -->
       
        <!-- ***** Service Area End ***** -->

        <!-- ***** Features Area Start ***** -->
    
<br>
<br>

        <p>Privacy Policy for Upstars</p>

<p>At www.upstars.in, accessible from www.upstars.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by www.upstars.in and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in www.upstars.in. This policy is not applicable to any information collected offline or via channels other than this website.</p>

<p>&nbsp;</p>

<p>Consent</p>

<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

<p>Information we collect</p>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>

<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>

<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

<p>How we use your information</p>

<p>We use the information we collect in various ways, including to:</p>

<ul>
	<li>Provide, operate, and maintain our website</li>
	<li>Improve, personalize, and expand our website</li>
	<li>Understand and analyze how you use our website</li>
	<li>Develop new products, services, features, and functionality</li>
	<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
	<li>Send you emails</li>
	<li>Find and prevent fraud</li>
</ul>

<p>Log Files</p>

<p>www.upstars.in follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&#39; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&#39; movement on the website, and gathering demographic information.</p>

<p>Advertising Partners Privacy Policies</p>

<p>You may consult this list to find the Privacy Policy for each of the advertising partners of www.upstars.in.</p>

<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on www.upstars.in, which are sent directly to users&#39; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

<p>Note that www.upstars.in has no access to or control over these cookies that are used by third-party advertisers.</p>

<p>Third Party Privacy Policies</p>

<p>www.upstars.in&#39;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&#39; respective websites.</p>

<p>CCPA Privacy Rights (Do Not Sell My Personal Information)</p>

<p>Under the CCPA, among other rights, California consumers have the right to:</p>

<p>Request that a business that collects a consumer&#39;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>

<p>Request that a business delete any personal data about the consumer that a business has collected.</p>

<p>Request that a business that sells a consumer&#39;s personal data, not sell the consumer&#39;s personal data.</p>

<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<p>GDPR Data Protection Rights</p>

<p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>

<p>The right to access &ndash; You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>

<p>The right to rectification &ndash; You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>

<p>The right to erasure &ndash; You have the right to request that we erase your personal data, under certain conditions.</p>

<p>The right to restrict processing &ndash; You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>

<p>The right to object to processing &ndash; You have the right to object to our processing of your personal data, under certain conditions.</p>

<p>The right to data portability &ndash; You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>

<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<p>Children&#39;s Information</p>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>www.upstars.in does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

<p>&nbsp;</p>


        <!--====== Footer Area Start ======-->
        <footer class="footer-area bg-overlay">
            <!-- Footer Top -->
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <!-- Copyright Area -->
                            <div class="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                <!-- Copyright Left -->
                                <div class="copyright-left">&copy; Copyrights 2022. All rights reserved.</div>
                                <!-- Copyright Right -->
                               <div class="copyright-right"><a href="#">Terms &amp; Conditions</a> | <a href="<?php echo base_url('home/privacy_policy');?>">Privacy Policy</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!--====== Footer Area End ======-->
    </div>


    <!-- ***** All jQuery Plugins ***** -->

    <!-- jQuery(necessary for all JavaScript plugins) -->
    <script src="<?php echo base_url();?>assets/js/jquery/jquery-3.3.1.min.js"></script>

    <!-- Bootstrap js -->
    <script src="<?php echo base_url();?>assets/js/bootstrap/popper.min.js"></script>
    <script src="<?php echo base_url();?>assets/js/bootstrap/bootstrap.min.js"></script>

    <!-- Plugins js -->
    <script src="<?php echo base_url();?>assets/js/plugins/plugins.min.js"></script>

    <!-- Active js -->
    <script src="<?php echo base_url();?>assets/js/active.js"></script>
</body>
</html>