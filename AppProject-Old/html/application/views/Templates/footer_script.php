<?php if ($this->session->flashdata('message')): 

  $message = $this->session->flashdata('message');
  ?>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><?=$message['message']?></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
<?php endif ?>

<div class="modal fade" id="myModalcancel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body">
            <h2 id="ermsgcancel"></h2>
            <p class="text-muted" id="ermsg"></p>
            <div class="modal-footer">
                <span id="cancelbookingid"></span>
                <?php $loginflag = 0; if (isset($_SESSION['user_id'])): ?>
               <?php if ($_SESSION['user_id'] > 0): $loginflag=1; ?>
                  
               <?php endif ?>
            <?php endif ?>
               <?php if ($loginflag == 0): ?>
                  <a class="nav-link header-login btn btn-secondary" href="#" data-toggle="modal" data-target="#login-modal" data-dismiss="modal">Login/Signup</a>
                
               <?php endif ?>
                
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>
</div>
      <script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
      <!-- Bootstrap Core JS -->
      <script src="<?php echo base_url();?>assets/js/popper.min.js"></script>
      <script src="<?php echo base_url();?>assets/js/bootstrap.min.js"></script>
      <!-- Slick JS -->
      <script src="<?php echo base_url();?>assets/js/slick.js"></script>
      <!-- Custom JS -->
      <script src="<?php echo base_url();?>assets/js/script.js"></script>

      <!-- Sticky Sidebar JS -->
      <script src="<?php echo base_url();?>assets/plugins/theia-sticky-sidebar/ResizeSensor.js"></script>
      <script src="<?php echo base_url();?>assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"></script>
      <!-- Select2 JS -->
      <script src="<?php echo base_url();?>assets/plugins/select2/js/select2.min.js"></script>
      <!-- Datetimepicker JS -->
      <script src="<?php echo base_url();?>assets/js/moment.min.js"></script>
      <script src="<?php echo base_url();?>assets/js/bootstrap-datetimepicker.min.js"></script>
      <!-- Fancybox JS -->
      <script src="<?php echo base_url();?>assets/plugins/fancybox/jquery.fancybox.min.js"></script>
      <script src="<?php echo base_url();?>assets/webiste_js_function/zepto.js"></script>
      <script src="<?php echo base_url();?>assets/webiste_js_function/sd.js"></script>
      <!-- Custom JS -->
<div class="modal fade call-modal" id="request-modal">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="modal-body get-app">
            <!-- Outgoing Call -->
            <div class="call-box incoming-box">
               <div class="call-wrapper">
                  <div class="call-inner">
                     <div class="call-user">
                        <h4 id="requesttile"></h4>
                        <p class="video-con"><h4 class="time-left">Time: <span class="time-count"><p id="requesttimer"></p></span></h4></p>
                     </div>
                  </div>
               </div>
            </div>
            <!-- Outgoing Call -->
         </div>
      </div>
   </div>
</div>
<script>
  $(document).ajaxStart(function() {
    $("#loading").show();
    $("#loadingotp").show();
    $("#loadingotpforgetpwd").show();
    $("#loadingotppwd").show();
  }).ajaxStop(function() {
    $("#loading").hide();
    $("#loadingotp").hide();
    $("#loadingotpforgetpwd").hide();
    $("#loadingotppwd").hide();
  });

<?php if ($this->session->flashdata('message')): ?>
 $(window).on('load', function() {
        $('#myModal').modal('show');
    }); 
<?php endif ?>


   $(document).ready(function(){
     $(".sd_one").hover(function(){
       $(this).css("background-color", "#cc0f73");
       $(".blog_cc_one").css("color", "#fff");
       $(".blog_tt_one").css("color", "#fff");
       }, 
   
       function(){
       $(this).css("background-color", "#fff");
       $(".blog_cc_one").css("color", "black");
       $(".blog_tt_one").css("color", "black");
   
     });
   
     $(".sd_two").hover(function(){
       $(this).css("background-color", "#cc0f73");
       $(".blog_cc_two").css("color", "#fff");
       $(".blog_tt_two").css("color", "#fff");
       }, 
   
       function(){
       $(this).css("background-color", "#fff");
       $(".blog_cc_two").css("color", "black");
       $(".blog_tt_two").css("color", "black");
   
     });
   
     $(".sd_three").hover(function(){
       $(this).css("background-color", "#cc0f73");
       $(".blog_cc_three").css("color", "#fff");
       $(".blog_tt_three").css("color", "#fff");
       }, 
   
       function(){
       $(this).css("background-color", "#fff");
       $(".blog_cc_three").css("color", "black");
       $(".blog_tt_three").css("color", "black");
   
     });
   
     $(".sd_four").hover(function(){
       $(this).css("background-color", "#cc0f73");
       $(".blog_cc_four").css("color", "#fff");
       $(".blog_tt_four").css("color", "#fff");
       }, 
   
       function(){
       $(this).css("background-color", "#fff");
       $(".blog_cc_four").css("color", "black");
       $(".blog_tt_four").css("color", "black");
   
     });

      <?php if (isset($_SESSION['user_id'])): ?>
      <?php if ($_SESSION['user_id'] > 0): ?>
         var apiurl = "<?=base_url('sdauth/GetUserdetails')?>";
         $.ajax({
                url: apiurl,
                type: "POST",
                success: function (data) {
                  var final_v = '';
                  var wallet = 0;
                  if(data.length != ''){
                  var json = JSON.parse(data);
                  if (json['status'] == true) 
                  {
                     final_v = json['user_details'].wallet;
                  }
                  $("#wallet-detail-user").html(final_v);
                  // $("#chatbuttone").html(chat_button);
                  }
                },
              });
      <?php endif ?>
   <?php endif ?>

   });

<?php if (isset($_SESSION['user_id'])): ?>
   <?php if ($_SESSION['user_id'] > 0): ?>
      function get_user_details()
      {
         var apiurl = "<?=base_url('sdauth/GetUserdetails')?>";
         $.ajax({
                url: apiurl,
                type: "POST",
                success: function (data) {
                  var final_v = '';
                  var wallet = 0;
                  if(data.length != ''){
                  var json = JSON.parse(data);
                  if (json['status'] == true) 
                  {
                     final_v = json['user_details'].wallet;
                  }
                  $("#wallet-detail-user").html(final_v);
                  // $("#chatbuttone").html(chat_button);
                  }
                },
              });
      }
      setInterval('get_user_details()', 10000);
   <?php endif ?>
<?php endif ?>

<?php if (isset($_SESSION['is_request'])): ?>
   <?php if ($_SESSION['is_request'] == 1): ?>
      $('#request-modal').modal({ backdrop: 'static', keyboard: false });
      function checkrequest()
      {
         var apiurl = "<?=base_url('sdauth/checkrequest')?>";
         $.ajax({
                url: apiurl,
                type: "POST",
                success: function (data) {
                  if(data.length != ''){
                     var json = JSON.parse(data);
                     if (json['status'] == true) 
                     {
                        if (json['flag'] == 2) 
                        {
                           $("#requesttile").html(json['title']);
                           var countDownDate = new Date(json['added_on']).getTime();
                           var now = new Date().getTime();
                           var distance = now - countDownDate;
                           var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                           var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                           var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                           var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                           document.getElementById("requesttimer").innerHTML =    minutes + "m " + seconds + "s ";
                        }
                        else
                        {
                           window.location="<?=current_url()?>";
                        }
                     }
                     else
                     {
                        window.location="<?=current_url()?>";
                     }
                  }
                  else
                  {
                     window.location="<?=current_url()?>";
                  }
                },
              });
      }
      setInterval('checkrequest()', 1000);
   <?php endif ?>
<?php endif ?>
</script>