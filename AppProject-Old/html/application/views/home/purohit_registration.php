<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title  -->
    <title>Purohit Registration</title>

    <!-- Favicon  -->
    <link rel="icon" href="<?php echo base_url();?>assets/img/favicon.png">

    <!-- ***** All CSS Files ***** -->

    <!-- Style css -->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/style.css">

    <!-- Skin css -->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/skin.css">
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/select2.min.css"/>

    <!-- Responsive css -->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/responsive.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" type="text/javascript"></script>
      <script type="text/javascript">
         $(document).ready(function() {
         $('.select2').select2({
         closeOnSelect: false
         });
         });
         
      </script>

</head>

<body class="homepage-9" style=" background-image: url(<?php echo base_url();?>assets/img/bg-1-2.png);">
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
                    <img class="navbar-brand-regular" src="<?php echo base_url();?>assets/img/logo/logo-white.png" width="150" alt="brand-logo">
                    <img class="navbar-brand-sticky" src="<?php echo base_url();?>assets/img/logo/logo.png" width="150" alt="sticky brand-logo">
                </a>
                <button class="navbar-toggler d-lg-none" type="button" data-toggle="navbarToggler" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-inner">
                    
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
                            <h2 class="text-white text-capitalize">Purohit Registration</h2>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a class="text-uppercase text-white" href="<?php echo base_url();?>">Home</a></li>
                                <li class="breadcrumb-item text-white active">Purohit Registration</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- ***** Breadcrumb Area End ***** -->

        <section class="section promo-area ptb_50">
            <div class="register-page">
               <div class="container">

               <?php
               if($this->session->flashdata('message')) {
                        $message = $this->session->flashdata('message');
                     ?>
            <div class="alert alert-<?php echo $message['class']; ?>">
               <button class="close" data-dismiss="alert" type="button">×</button>
               <?php echo $message['message']; ?>
            </div>
            <?php
               }
               ?>


                  <div class="rounded p-4 p-sm-5 mt-5 mt-lg-0 shadow-lg-reg">
                  <form method="post" enctype="multipart/form-data">
                     <div class="row">
                        <br>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Name</label>
                              <input type="text" class="form-control" name="name" placeholder="Name" >
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Email</label>
                              <input type="email" class="form-control" name="email" placeholder="Email" >
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
<div class="form-group">
   <div class="row">
      <div class="col-sm-12 col-xs-12">
         <label class="upload">Mobile No.</label>
      </div>
   </div>
   <div class="row">
      <div class="col-sm-4 form-group">
         <select name="countryCode" id="" class="form-control pl-0">
            <option data-countryCode="IN" value="91" Selected>(+91)</option>
            <!--  <option data-countryCode="GB" value="44" Selected>Norway (+47)</option>
               <option data-countryCode="US" value="1">UK (+44)</option> -->
            <optgroup label="Other countries">
               <option data-countryCode="DZ" value="213">(+213)</option>
               <option data-countryCode="AD" value="376">(+376)</option>
               <option data-countryCode="AO" value="244">(+244)</option>
               <option data-countryCode="AI" value="1264">(+1264)</option>
               <option data-countryCode="AG" value="1268">(+1268)</option>
               <option data-countryCode="AR" value="54">(+54)</option>
               <option data-countryCode="AM" value="374">(+374)</option>
               <option data-countryCode="AW" value="297">(+297)</option>
               <option data-countryCode="AU" value="61">(+61)</option>
               <option data-countryCode="AT" value="43">(+43)</option>
               <option data-countryCode="AZ" value="994">(+994)</option>
               <option data-countryCode="BS" value="1242"> (+1242)</option>
               <option data-countryCode="BH" value="973"> (+973)</option>
               <option data-countryCode="BD" value="880"> (+880)</option>
               <option data-countryCode="BB" value="1246"> (+1246)</option>
               <option data-countryCode="BY" value="375"> (+375)</option>
               <option data-countryCode="BE" value="32"> (+32)</option>
               <option data-countryCode="BZ" value="501"> (+501)</option>
               <option data-countryCode="BJ" value="229"> (+229)</option>
               <option data-countryCode="BM" value="1441"> (+1441)</option>
               <option data-countryCode="BT" value="975"> (+975)</option>
               <option data-countryCode="BO" value="591"> (+591)</option>
               <option data-countryCode="BA" value="387"> (+387)</option>
               <option data-countryCode="BW" value="267">(+267)</option>
               <option data-countryCode="BR" value="55"> (+55)</option>
               <option data-countryCode="BN" value="673"> (+673)</option>
               <option data-countryCode="BG" value="359"> (+359)</option>
               <option data-countryCode="BF" value="226">  (+226)</option>
               <option data-countryCode="BI" value="257"> (+257)</option>
               <option data-countryCode="KH" value="855"> (+855)</option>
               <option data-countryCode="CM" value="237"> (+237)</option>
               <option data-countryCode="CA" value="1"> (+1)</option>
               <option data-countryCode="CV" value="238"> (+238)</option>
               <option data-countryCode="KY" value="1345"> (+1345)</option>
               <option data-countryCode="CF" value="236"> (+236)</option>
               <option data-countryCode="CL" value="56"> (+56)</option>
               <option data-countryCode="CN" value="86"> (+86)</option>
               <option data-countryCode="CO" value="57"> (+57)</option>
               <option data-countryCode="KM" value="269"> (+269)</option>
               <option data-countryCode="CG" value="242"> (+242)</option>
               <option data-countryCode="CK" value="682">  (+682)</option>
               <option data-countryCode="CR" value="506">  (+506)</option>
               <option data-countryCode="HR" value="385"> (+385)</option>
               <option data-countryCode="CU" value="53"> (+53)</option>
               <option data-countryCode="CY" value="90392">  (+90392)</option>
               <option data-countryCode="CY" value="357">  (+357)</option>
               <option data-countryCode="CZ" value="42">  (+42)</option>
               <option data-countryCode="DK" value="45"> (+45)</option>
               <option data-countryCode="DJ" value="253"> (+253)</option>
               <option data-countryCode="DM" value="1809"> (+1809)</option>
               <option data-countryCode="DO" value="1809">  (+1809)</option>
               <option data-countryCode="EC" value="593"> (+593)</option>
               <option data-countryCode="EG" value="20"> (+20)</option>
               <option data-countryCode="SV" value="503">  (+503)</option>
               <option data-countryCode="GQ" value="240">  (+240)</option>
               <option data-countryCode="ER" value="291"> (+291)</option>
               <option data-countryCode="EE" value="372"> (+372)</option>
               <option data-countryCode="ET" value="251"> (+251)</option>
               <option data-countryCode="FK" value="500">  (+500)</option>
               <option data-countryCode="FO" value="298">  (+298)</option>
               <option data-countryCode="FJ" value="679"> (+679)</option>
               <option data-countryCode="FI" value="358"> (+358)</option>
               <option data-countryCode="FR" value="33"> (+33)</option>
               <option data-countryCode="GF" value="594">  (+594)</option>
               <option data-countryCode="PF" value="689">  (+689)</option>
               <option data-countryCode="GA" value="241"> (+241)</option>
               <option data-countryCode="GM" value="220"> (+220)</option>
               <option data-countryCode="GE" value="7880"> (+7880)</option>
               <option data-countryCode="DE" value="49"> (+49)</option>
               <option data-countryCode="GH" value="233"> (+233)</option>
               <option data-countryCode="GI" value="350"> (+350)</option>
               <option data-countryCode="GR" value="30"> (+30)</option>
               <option data-countryCode="GL" value="299"> (+299)</option>
               <option data-countryCode="GD" value="1473"> (+1473)</option>
               <option data-countryCode="GP" value="590"> (+590)</option>
               <option data-countryCode="GU" value="671"> (+671)</option>
               <option data-countryCode="GT" value="502"> (+502)</option>
               <option data-countryCode="GN" value="224"> (+224)</option>
               <option data-countryCode="GW" value="245">  (+245)</option>
               <option data-countryCode="GY" value="592"> (+592)</option>
               <option data-countryCode="HT" value="509"> (+509)</option>
               <option data-countryCode="HN" value="504"> (+504)</option>
               <option data-countryCode="HK" value="852">  (+852)</option>
               <option data-countryCode="HU" value="36"> (+36)</option>
               <option data-countryCode="IS" value="354"> (+354)</option>
               <!--  <option data-countryCode="IN" value="91">India (+91)</option> -->
               <option data-countryCode="ID" value="62"> (+62)</option>
               <option data-countryCode="IR" value="98"> (+98)</option>
               <option data-countryCode="IQ" value="964"> (+964)</option>
               <option data-countryCode="IE" value="353"> (+353)</option>
               <option data-countryCode="IL" value="972"> (+972)</option>
               <option data-countryCode="IT" value="39"> (+39)</option>
               <option data-countryCode="JM" value="1876"> (+1876)</option>
               <option data-countryCode="JP" value="81"> (+81)</option>
               <option data-countryCode="JO" value="962"> (+962)</option>
               <option data-countryCode="KZ" value="7"> (+7)</option>
               <option data-countryCode="KE" value="254"> (+254)</option>
               <option data-countryCode="KI" value="686"> (+686)</option>
               <option data-countryCode="KP" value="850">  (+850)</option>
               <option data-countryCode="KR" value="82">  (+82)</option>
               <option data-countryCode="KW" value="965"> (+965)</option>
               <option data-countryCode="KG" value="996"> (+996)</option>
               <option data-countryCode="LA" value="856"> (+856)</option>
               <option data-countryCode="LV" value="371"> (+371)</option>
               <option data-countryCode="LB" value="961"> (+961)</option>
               <option data-countryCode="LS" value="266"> (+266)</option>
               <option data-countryCode="LR" value="231"> (+231)</option>
               <option data-countryCode="LY" value="218"> (+218)</option>
               <option data-countryCode="LI" value="417"> (+417)</option>
               <option data-countryCode="LT" value="370"> (+370)</option>
               <option data-countryCode="LU" value="352"> (+352)</option>
               <option data-countryCode="MO" value="853"> (+853)</option>
               <option data-countryCode="MK" value="389"> (+389)</option>
               <option data-countryCode="MG" value="261"> (+261)</option>
               <option data-countryCode="MW" value="265"> (+265)</option>
               <option data-countryCode="MY" value="60"> (+60)</option>
               <option data-countryCode="MV" value="960"> (+960)</option>
               <option data-countryCode="ML" value="223"> (+223)</option>
               <option data-countryCode="MT" value="356"> (+356)</option>
               <option data-countryCode="MH" value="692">  (+692)</option>
               <option data-countryCode="MQ" value="596"> (+596)</option>
               <option data-countryCode="MR" value="222"> (+222)</option>
               <option data-countryCode="YT" value="269"> (+269)</option>
               <option data-countryCode="MX" value="52"> (+52)</option>
               <option data-countryCode="FM" value="691"> (+691)</option>
               <option data-countryCode="MD" value="373"> (+373)</option>
               <option data-countryCode="MC" value="377"> (+377)</option>
               <option data-countryCode="MN" value="976"> (+976)</option>
               <option data-countryCode="MS" value="1664"> (+1664)</option>
               <option data-countryCode="MA" value="212"> (+212)</option>
               <option data-countryCode="MZ" value="258"> (+258)</option>
               <option data-countryCode="MN" value="95"> (+95)</option>
               <option data-countryCode="NA" value="264"> (+264)</option>
               <option data-countryCode="NR" value="674"> (+674)</option>
               <option data-countryCode="NP" value="977"> (+977)</option>
               <option data-countryCode="NL" value="31"> (+31)</option>
               <option data-countryCode="NC" value="687">  (+687)</option>
               <option data-countryCode="NZ" value="64">  (+64)</option>
               <option data-countryCode="NI" value="505"> (+505)</option>
               <option data-countryCode="NE" value="227"> (+227)</option>
               <option data-countryCode="NG" value="234"> (+234)</option>
               <option data-countryCode="NU" value="683"> (+683)</option>
               <option data-countryCode="NF" value="672">  (+672)</option>
               <option data-countryCode="NP" value="670">  (+670)</option>
               <option data-countryCode="NO" value="47"> (+47)</option>
               <option data-countryCode="OM" value="968"> (+968)</option>
               <option data-countryCode="PW" value="680"> (+680)</option>
               <option data-countryCode="PA" value="507"> (+507)</option>
               <option data-countryCode="PG" value="675"> (+675)</option>
               <option data-countryCode="PY" value="595"> (+595)</option>
               <option data-countryCode="PE" value="51"> (+51)</option>
               <option data-countryCode="PH" value="63"> (+63)</option>
               <option data-countryCode="PL" value="48"> (+48)</option>
               <option data-countryCode="PT" value="351"> (+351)</option>
               <option data-countryCode="PR" value="1787">  (+1787)</option>
               <option data-countryCode="QA" value="974"> (+974)</option>
               <option data-countryCode="RE" value="262"> (+262)</option>
               <option data-countryCode="RO" value="40"> (+40)</option>
               <option data-countryCode="RU" value="7"> (+7)</option>
               <option data-countryCode="RW" value="250"> (+250)</option>
               <option data-countryCode="SM" value="378"> (+378)</option>
               <option data-countryCode="ST" value="239"> (+239)</option>
               <option data-countryCode="SA" value="966">(+966)</option>
               <option data-countryCode="SN" value="221"> (+221)</option>
               <option data-countryCode="CS" value="381"> (+381)</option>
               <option data-countryCode="SC" value="248"> (+248)</option>
               <option data-countryCode="SL" value="232">(+232)</option>
               <option data-countryCode="SG" value="65"> (+65)</option>
               <option data-countryCode="SK" value="421">(+421)</option>
               <option data-countryCode="SI" value="386"> (+386)</option>
               <option data-countryCode="SB" value="677"> (+677)</option>
               <option data-countryCode="SO" value="252"> (+252)</option>
               <option data-countryCode="ZA" value="27"> (+27)</option>
               <option data-countryCode="ES" value="34"> (+34)</option>
               <option data-countryCode="LK" value="94"> (+94)</option>
               <option data-countryCode="SH" value="290"> (+290)</option>
               <option data-countryCode="KN" value="1869">(+1869)</option>
               <option data-countryCode="SC" value="1758">(+1758)</option>
               <option data-countryCode="SD" value="249"> (+249)</option>
               <option data-countryCode="SR" value="597"> (+597)</option>
               <option data-countryCode="SZ" value="268">(+268)</option>
               <option data-countryCode="SE" value="46"> (+46)</option>
               <option data-countryCode="CH" value="41"> (+41)</option>
               <option data-countryCode="SI" value="963"> (+963)</option>
               <option data-countryCode="TW" value="886"> (+886)</option>
               <option data-countryCode="TJ" value="7"> (+7)</option>
               <option data-countryCode="TH" value="66"> (+66)</option>
               <option data-countryCode="TG" value="228"> (+228)</option>
               <option data-countryCode="TO" value="676"> (+676)</option>
               <option data-countryCode="TT" value="1868"> (+1868)</option>
               <option data-countryCode="TN" value="216"> (+216)</option>
               <option data-countryCode="TR" value="90"> (+90)</option>
               <option data-countryCode="TM" value="7"> (+7)</option>
               <option data-countryCode="TM" value="993"> (+993)</option>
               <option data-countryCode="TC" value="1649">  (+1649)</option>
               <option data-countryCode="TV" value="688"> (+688)</option>
               <option data-countryCode="UG" value="256"> (+256)</option>
               <option data-countryCode="GB" value="44"> (+44)</option>
               <option data-countryCode="UA" value="380"> (+380)</option>
               <option data-countryCode="AE" value="971">  (+971)</option>
               <option data-countryCode="UY" value="598"> (+598)</option>
               <option data-countryCode="US" value="1"> (+1)</option>
               <option data-countryCode="UZ" value="7"> (+7)</option>
               <option data-countryCode="VU" value="678"> (+678)</option>
               <option data-countryCode="VA" value="379">  (+379)</option>
               <option data-countryCode="VE" value="58"> (+58)</option>
               <option data-countryCode="VN" value="84"> (+84)</option>
               <option data-countryCode="VG" value="84"> (+1284)</option>
               <option data-countryCode="VI" value="84">  (+1340)</option>
               <option data-countryCode="WF" value="681">  (+681)</option>
               <option data-countryCode="YE" value="969"> (+969)</option>
               <option data-countryCode="YE" value="967"> (+967)</option>
               <option data-countryCode="ZM" value="260"> (+260)</option>
               <option data-countryCode="ZW" value="263"> (+263)</option>
            </optgroup>
         </select>
      </div>
      <div class="col-sm-8 form-group"> <input type="number" class="form-control" name="mobile" placeholder="Mobile No." ></div>
   </div>
</div>
</div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Gender</label>
                              <select class="form-control" name="gender">
                                 <option>Select Gender</option>
                                 <option>Male</option>
                                 <option>Female</option>
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">D.O.B</label>
                              <input type="date" name="dob"  class="form-control" placeholder="Date of Birth" required="">
                           </div>
                        </div>

                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Address</label>
                              <input type="text" class="form-control" name="location" placeholder="Address" >
                           </div>
                        </div>
                        
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Experience</label>
                              <input type="text" class="form-control" name="experience" placeholder="Experience" >
                           </div>
                        </div>

                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Kul Devta</label>
                              <input type="text" class="form-control" name="kul_devta" placeholder="Kul Devta" >
                           </div>
                        </div>
               
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Temple Address</label>
                              <input type="text" class="form-control" name="temple_address" placeholder="Temple Address" >
                           </div>
                        </div>
                    
                    
                       
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Temple State</label>
                              <select class="form-control" name="state"  id="state">
                                 <option value="0">Select</option>
                                 <?php foreach ($state as $key): ?>
                                    <option value="<?=$key->id?>"><?=$key->state_name?></option>
                                    <?php endforeach ?>   
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Temple City</label>
                              <select name="city" id="city" class="form-control" required="">
                                      <option value="0" selected="selected">&nbsp;&nbsp;City</option>
                              </select>
                           </div>
                        </div>
                      
                     
                        
                     </div>
                     <div class="row mt-4">
                        <div class="col-sm-7 col-xs-12">
                           <label class="checkbox-inline">
                           <input type="checkbox" value="" checked="" required=""> By Clicking Submit, you agree to Our
                           <a href="<?php echo base_url();?>#" class="terms-color"><u>Terms &amp; Conditions</u></a> and <a href="<?php echo base_url();?>#" class="terms-color"><u>Privacy Policy</u></a>
                           </label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-12 mt-4">
                           <button type="submit" class="btn btn-purple btn-lg">
                           Submit
                           </button>
                        </div>
                     </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>

       

       

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

     
    <script type="text/javascript">
  $('#confirm_bank_account').keyup(function(){
     var confirm_bank_account = $('#confirm_bank_account').val();   
   if (confirm_bank_account) 
   { 
  $('#bank_account, #confirm_bank_account').on('keyup', function () {
  if ($('#bank_account').val() == $('#confirm_bank_account').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else 
    $('#message').html('Not Matching').css('color', 'red');
});
  }

  })
  

</script>

    <script type="text/javascript">
  $(document).ready(function(){
   
    $('#state').on('change',function(){
      id=$(this).val();
       // alert( id);
      $.ajax({
        url:'<?php echo base_url();?>home/getCity',
        method:'post',
        data:{ide:id},
         success:function(data)
          {
           $('#city').html(data);
          }
      });
    });
  });
</script>

    <!-- ***** All jQuery Plugins ***** -->

    <!-- jQuery(necessary for all JavaScript plugins) -->
    <script src="<?php echo base_url();?>assets/js/jquery/jquery-3.3.1.min.js"></script>
     <script src="<?php echo base_url();?>assets/js/select2.min.js" type="text/javascript"></script>

    <!-- Bootstrap js -->
    <script src="<?php echo base_url();?>assets/js/bootstrap/popper.min.js"></script>
    <script src="<?php echo base_url();?>assets/js/bootstrap/bootstrap.min.js"></script>

    <!-- Plugins js -->
    <script src="<?php echo base_url();?>assets/js/plugins/plugins.min.js"></script>

    <!-- Active js -->
    <script src="<?php echo base_url();?>assets/js/active.js"></script>
</body>

</html>