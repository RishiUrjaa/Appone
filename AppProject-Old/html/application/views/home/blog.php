<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title  -->
    <title>Blog</title>

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


    <body class="blog" style=" background-image: url(<?php echo base_url();?>assets/img/bg-1-2.png);">
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
                    <img class="navbar-brand-regular" src="<?php echo base_url();?>assets/img/logo/logo-white.png" alt="brand-logo"  width="150">
                    <img class="navbar-brand-sticky" src="<?php echo base_url();?>assets/img/logo/logo.png" alt="sticky brand-logo"  width="150">
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
                                <a class="nav-link" href="<?php echo base_url();?>#home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url();?>#about">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url('home/product');?>">Product</a>
                            </li>
                            <li class="nav-item">
                           <a class="nav-link" href="<?php echo base_url();?>#services">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url();?>#astrology">Astrology</a>
                            </li>
                             <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url('home/blog');?>">Blog</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url();?>#partner-registration">Partner Registration</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo base_url();?>#contact">Contact</a>
                            </li>
                           
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <!-- ***** Header End ***** -->

        <!-- ***** Breadcrumb Area Start ***** -->
        <section class="section breadcrumb-area bg-overlay d-flex align-items-center">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Breamcrumb Content -->
                        <div class="breadcrumb-content d-flex flex-column align-items-center text-center">
                            <h3 class="text-white">Blogs</h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="<?php echo base_url();?>">Home</a></li>
                                <li class="breadcrumb-item active">Blog</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- ***** Breadcrumb Area End ***** -->

        <!-- ***** Blog Area Start ***** -->
        <section id="blog" class="section blog-area ptb_100">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <!-- Single Blog -->
                        <div class="single-blog res-margin">
                            <!-- Blog Thumb -->
                            <div class="blog-thumb">
                                <a href="<?php echo base_url('home/blog_details');?>"><img src="<?php echo base_url();?>assets/img/blog-1.jpg" alt=""></a>
                            </div>
                            <!-- Blog Content -->
                            <div class="blog-content p-4">
                                <!-- Meta Info -->
                                
                                <!-- Blog Title -->
                                <h3 class="blog-title my-3"><a href="<?php echo base_url('home/blog_details');?>">Tarot card reading - is it even close to being accurate?</a></h3>
                                <p>Are you interested in astrology or tarot card reading? Nowadays, everyone believes in Tarot card reading to know their future or improve their future.</p>
                                <a href="<?php echo base_url('home/blog_details');?>" class="btn btn-purple btn-lg mt-3">Read More</a>
                            </div>
                            <!-- Blog Date -->
                            <div class="blog-date">
                                <span class="badge badge-pill ml-2">Apr 15</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <!-- Single Blog -->
                        <div class="single-blog res-margin">
                            <!-- Blog Thumb -->
                            <div class="blog-thumb">
                                <a href="<?php echo base_url('home/blog_details');?>"><img src="<?php echo base_url();?>assets/img/blog-2.jpg" alt=""></a>
                            </div>
                            <!-- Blog Content -->
                            <div class="blog-content p-4">
                                <!-- Meta Info -->
                                
                                <!-- Blog Title -->
                                <h3 class="blog-title my-3"><a href="<?php echo base_url('home/blog_details_2');?>">What is the Significance of a Wall Clock?</a></h3>
                                <p>Have you ever witnessed someone close to you suddenly experiencing a positive change in their life after following Vastu? I think yes.</p>
                                <a href="<?php echo base_url('home/blog_details_2');?>" class="btn btn-purple btn-lg mt-3">Read More</a>
                            </div>
                            <!-- Blog Date -->
                            <div class="blog-date">
                                <span class="badge badge-pill ml-2">Apr 14</span>
                            </div>
                        </div>
                    </div>
                   
                   
                   
                   
                    
                   
                </div>
                <div class="row">
                    <div class="col-12">
                        <!-- Pagination -->
                        <ul class="pagination justify-content-center">
                            <li class="disabled px-1">
                                <a href="<?php echo base_url();?>#" aria-label="Previous">
                                    <i class="fas fa-arrow-left"></i>
                                </a>
                            </li>
                            <li class="px-1"><a href="<?php echo base_url();?>#">1</a></li>
                            <li class="active px-1"><a href="<?php echo base_url();?>#">2</a></li>
                            <li class="px-1"><a href="<?php echo base_url();?>#">3</a></li>
                            <li>
                                <a href="<?php echo base_url();?>#" aria-label="Next">
                                    <i class="fas fa-arrow-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- ***** Blog Area End ***** -->

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
                               <div class="copyright-right"><a href="<?php echo base_url();?>#">Terms &amp; Conditions</a> | <a href="<?php echo base_url();?>#">Privacy Policy</a></div>
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