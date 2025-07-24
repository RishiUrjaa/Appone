<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #F6CC56;
  color: #000;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #F6CC56;
}

.container {
  background-color: #f2f2f2;
  padding: 20px;
  width: 600px;
  margin: 0 auto;
  margin-bottom: 0px;
}

.logo{
  width: 600px;
  margin: 30px auto;
  background-color: #f7f7f7;
  padding: 10px 0 10px 15px;
  margin-bottom: 2px;
}
</style>
</head>
<body>


<div class="logo">
<img src="http://www.devvaani.com/assets/images/logo1.png" width="80">
</div>
<div class="container">
  <form action="" method="post">
    <label for="fname">New Password</label>
    <input type="text" id="fname" name="password" placeholder="New Password">

    <label for="lname">Confirm Password</label>
    <input type="text" id="lname" name="comfirm" placeholder="Confirm Password">

    <input type="submit" value="Submit">
  </form>
</div>

</body>
</html>
