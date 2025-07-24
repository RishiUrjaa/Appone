
  


          <!-- mobile botton -->
        <div class="mobile-bottom hidden-lg hidden-md">
    <a href="javascript:void(0)" class="sort-btn1" data-toggle="modal" data-target="#sort"><i class="fas fa-sort-amount-down"></i> Sort by</a>
   <a href="javascript:void(0)" class="sort-btn1" data-toggle="modal" data-target="#filter"><i class="fas fa-filter"></i> Filter</a>

   <a href="javascript:void(0)" class="sort-btn2"><i class="fas fa-search"></i> Search</a>
             </div>

       <!-- end mobile bottom -->


  
         <!-- Breadcrumb -->
               <div class="breadcrumb-bar">
              <div class="container-fluid">
            <div class="row align-items-center">
               <div class="col-md-8 col-12">
   <nav aria-label="breadcrumb" class="page-breadcrumb">
                  <ol class="breadcrumb">
   <li class="breadcrumb-item"><a href="index.html">Home</a></li>
   <li class="breadcrumb-item active" aria-current="page">Astrologer list</li>
                           </ol>
                          </nav>
   <h2 class="breadcrumb-title">Astrologer List</h2>
                        </div>
                        </div>
                        </div>
                        </div>
                 <!-- /Breadcrumb -->
                 <!-- Page Content -->
                <div class="content">
            <div class="container-fluid">
                  <div class="row">
         <div class="col-md-7 free-space hidden-xs hidden-sm">
                       </div>
         <div class="col-lg-5 free-space hidden-xs hidden-sm"> 
              <div class="filter-box">
     <a href="javascript:void(0)" class="btn view-btn sort-btn" data-toggle="modal" data-target="#filter"><i class="fas fa-filter"></i> Filter</a>
      <a href="javascript:void(0)" class="btn view-btn sort-btn" data-toggle="modal" data-target="#sort"><i class="fas fa-sort-amount-down"></i> Sort by</a>
           <form class="search-form">
           <div class="input-group">
 <input type="text" placeholder="Search..." id="search-box" class="form-control search-box">
        <div class="input-group-append">
<button type="" class="btn btn-primary search1-box"><i class="fa fa-search"></i></button>
                      </div>
                      </div>
                      </div>
                     </form>
                      </div>
                 



         <div class="col-md-12 col-lg-12 col-xl-12">
        
                        <div class="row filter_data" id="filter_data">
                            
                        </div>

                     <div class="row">
                  <div class="col-xl-12">
       <form class="search-form mobile-search hidden-lg hidden-md">
           <div class="input-group">
 <input type="text" placeholder="Search..." class="form-control search-box">
        <div class="input-group-append">
<button type="submit" class="btn btn-primary search1-box"><i class="fa fa-search"></i></button>
                      </div>
                      </div>
                      </form>
                        </div>
                        

                        <?php if (!empty($astro_data))
                            {
                              foreach ($astro_data as $key)
                              {

?>



                                   <div class="col-md-3 astro-list hide_data" id="hide_data">
                                          <!-- start -->
                                         <div class="card1" >
                                    <div class="card-header1">
                                       <div class="media">
                                    <div class="media-left">
                                     <img src="<?= BASE_URL_IMAGE.'astrologers/'.$key->image ?>"  style="border-radius: 50%;" class="media-object astro-img">
                                                           </div>

                                                    <div class="media-body">
                                     <a href="<?=base_url('home/astrologer_profile/'.$key->id)?>"> <h4 class="media-heading astro-name"><?=$key->name?></h4></a>
                                     <p class="astro-rating">
                                      <?php
                                       $r = round($key->rating->average,1);
                                      // $r = round($key->rating->average);
    if ($r >= 5) {
      ?>
      <div class="rating">
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <i class="fas fa-star filled"></i>
        <span class="d-inline-block average-rating">(<?php echo $r; ?>)</span>
      </div>
      <?php
    }
  
    elseif ($r >= 4) 
    {
    ?>
    <div class="rating">
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star "></i>
      <span class="d-inline-block average-rating">(<?php echo $r."/5"; ?>)</span>
    </div>
    <?php
    }
    elseif ($r >= 3) 
    {
    ?>
    <div class="rating">
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <span class="d-inline-block average-rating">(<?php echo $r."/5"; ?>)</span>
    </div>
    <?php
    }
    elseif ($r >= 2) 
    {
    ?>
    <div class="rating">
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <span class="d-inline-block average-rating">(<?php echo $r."/5"; ?>)</span>
    </div>
    <?php
    }
    elseif ($r >= 1) 
    {
    ?>
    <div class="rating">
      <i class="fas fa-star filled"></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <span class="d-inline-block average-rating">(<?php echo $r."/5"; ?>)</span>
    </div>
    <?php
    }
    elseif (empty($r)) 
    {
    ?>
    <div class="rating">
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <i class="fas fa-star "></i>
      <span class="d-inline-block average-rating">(<?php echo "0/5"; ?>)</span>
    </div>
    <?php
    }
?></p>
<?php 
if ($key->online_status == 1) {
  ?>
   <p class="online-a">&nbsp;<i class="fa fa-circle" aria-hidden="true"></i>&nbsp;Online</p>
  <?php
}
if ($key->online_status == 2) {
?>
   <p class="busy-a">&nbsp;<i class="fa fa-circle" aria-hidden="true"></i>&nbsp;Busy <br>
           <span class="wait-time">Wait time ~ <?php echo $key->wait_time; ?>min</span></p>
<?php
}
if (empty($key->online_status)) {

  ?>
     <p class="offline-a">&nbsp;<i class="fa fa-circle" aria-hidden="true"></i>&nbsp;Offline</p>

  <?php
}
?>
                                     


                                       
                                                             </div>
                                                             </div>
                                                             </div>
                                                     <div class="card-body1">
                                                        <div class="row">
                                                     <div class="col-md-6 col-6">
                                                     <ul class="astro-info">
                                        <li><i class="fa fa-graduation-cap" aria-hidden="true"></i>&nbsp;&nbsp;<?=$key->experience?> Years</li>
                                        <li><i class="fa fa-language" aria-hidden="true"></i>&nbsp;&nbsp;<?php echo preg_replace('/\s+?(\S+)?$/', '', substr($key->languages, 0, 12)).".."; ?></li>
                                        <li><i class="fas fa-shield-alt"></i>&nbsp;&nbsp;<?php echo substr($key->experties_string, 0, 20).".."; ?></li>
                                        <li><i class="fas fa-rupee-sign"></i>&nbsp;&nbsp;<?=$key->price_per_mint_chat?>/Min</li>
                                                           </ul>
                                                           </div>
                                           <div class="col-md-6 col-6 text-right video-call-btn">

                                     <a href="#" data-toggle="modal" data-target="#download-popup"><img src="<?=base_url("assets/img/video-icon.png")?>" class="img-width"></a> 
                                     <a href="#" data-toggle="modal" data-target="#download-popup"><img src="<?=base_url("assets/img/call-icon.png")?>" class="img-width"></a>  
                                     <a href="<?=base_url('home/astrologer_profile/'.$key->id)?>"><img src="<?=base_url("assets/img/chat-icon.png")?>" class="img-width"></a>
                                                           </div>
                                                            </div>
                                                            </div>
                                         
                                                          </div>
                                                       <!--end-->
                                                        </div>
                                <?php
                              }
                            } 
                            ?>



                      </div>
     
                  </div>
                  </div>
                   </div>
                   </div>
         <!-- /Page Content -->
       