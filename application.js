let  exportData ={}
var cplogo=""

    $( document ).ready(function() {
      getmyparm(location.search);
    });
 
function getmyparm(search_string) {
var parse = function(params, pairs) {
    var pair = pairs[0];
    var parts = pair.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts.slice(1).join('='));

    // Handle multiple parameters of the same name
    if (typeof params[key] === "undefined") {
      params[key] = value;
    } else {
      params[key] = [].concat(params[key], value);
    }

    return pairs.length == 1 ? params : parse(params, pairs.slice(1))
  }

  // Get rid of leading ?
  let q=search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
  console.log(q)
  q = typeof q.cp === "undefined" ? {cp:'IPR'} :q
  //https://drive.google.com/file/d/10xQcVQ2Zp4Uz9xlhYl7sJ2SfhFS9wT7S/view?usp=drive_link
  //https://drive.google.com/file/d/1Z6Pn6FWR8zQXFNQRS5FFSQUlU297_q6b/view?usp=drive_link
  //  let  logo={
  //   "IPR":"10xQcVQ2Zp4Uz9xlhYl7sJ2SfhFS9wT7S"
  // }
  
  

  let cplogo="https://pggitdev.github.io/ppg-files/asset/primelogo.png"
    //+logo[q.cp]
  //console.log(cplogo)

  $('#comp').val(q.cp);
  $('#hlogo').attr('src','').promise().done(function() {
$(this).attr('src',cplogo);
	//console.log("Src="+cplogo)
convert_imageURL_to_Base64(cplogo, function (imageBase64) {
    $('#logo_base64').val(imageBase64);
	//console.log($('#logo_base64').val());
});
convert_imageURL_to_Base64("https://pggitdev.github.io/ppg-files/asset/ppgconsent.jpg", function (imageBase64) {
    $('#consent_base64').val(imageBase64);
});  
});
//console.log("XX--"+$('#hlogo').attr('src'))
  return q 
  
}


  //bootsnipp.com/snippets/nP8E7
  //codepen.io/ankithingarajiya/pen/NQNvMe
  //stackoverflow.com/questions/44813287/how-to-create-html-form-that-accepts-field-values-as-url-parameters
  //https://pdfmake.github.io/docs/0.1/document-definition-object/images/
  // https://printjs.crabbly.com/
  //https://codepen.io/vb6/pen/dzmdjK  **signature pad
  // The input can be assigned only numbers. 
// Use onkeypress="return inputNumbers(event);" in input field.
$('#bt_submit').prop("disabled", true);
var wrapper1 = document.getElementById("signature-pad-1"),
    canvas1 = wrapper1.querySelector("canvas"),
    signaturePad1;

function resizeCanvas(canvas) {
    var ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}


    resizeCanvas(canvas1);
    signaturePad1 = new SignaturePad(canvas1, {
            backgroundColor: 'rgb(255,255,255)', 
              penColor: "rgb(66, 133, 244)",
            onBegin: function() {
      //         console.log('onbegin');
            },            
            onEnd: function() {
               //console.log('onEnd');
               var data = signaturePad1.toDataURL('image/png');
               $('#SignupImage1').val(data);
              
               var data_uri = signaturePad1.toDataURL();            
                //convert to base64         
              var signbase64Data = data_uri.replace(/^data:image\/\w+;base64,/, "");     

              $("#signimgs").attr("src",data_uri); 
            }
         });         

    var saveButton1 = document.getElementById('btnSubmit'),
        clearButton1 = document.getElementById('btnRest');

  
$("#btnRest").click(function(){
        signaturePad1.clear();
});
 
	 
//var checkparams = get_params(location.search);




      


function inputNumbers(e) {
    var keynum;
    var keychar;
    var numcheck;
    if (window.event) {// IE
        keynum = e.keyCode;
    } else if (e.which) {// Netscape/Firefox/Opera
        keynum = e.which;
    }
    if (keynum == 13 || keynum == 8 || typeof (keynum) == "undefined") {
        return true;
    }
    keychar = String.fromCharCode(keynum);
    numcheck = /^[0-9.]$/;  // Add a regular expression to this line.
    return numcheck.test(keychar);
}
function validateIDLength(input) {
    if (input.value.length !== 13) {
        alert("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
        input.focus();
    }
}


// Convert image url to base64
function convert_imageURL_to_Base64(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

// Logo to base64

// Datepickers i18n TH Language
var months = 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
    shortMonths = 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
    days = 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
    shortDays = 'อา_จ_อ_พ_พฤ_ศ_ส'.split('_');
var th = new duDatepicker.i18n.Locale(months, shortMonths, days, shortDays, shortDays, 1);

//** FORM */
// Image preview
$('#profile_image').change(function () {
    readFile(this, '#profile_image_preview','#profile_image_base64');
});

$('#idcard_image').change(function () {
    readFile(this, '#idcard_image_preview','#idcard_image_base64');
});


// function readFile(input, previewId, el_base64) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $(previewId).css('background-image', 'url(' + e.target.result + ')');
//             $(previewId).hide();
//             $(previewId).fadeIn(650);
//             $(el_base64).val(e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }
function readFile(input, previewId, el_base64) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = async function () {
                const resizedImage = await resizeImage(img, 800, 800, 0.7); // ปรับขนาดก่อนแสดงผล
                $(previewId).css('background-image', 'url(' + resizedImage + ')');
                $(previewId).hide().fadeIn(650);
                $(el_base64).val(resizedImage); // เก็บ Base64 ที่ resize แล้ว
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function resizeImage(image, maxWidth, maxHeight, quality) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = image.width;
        let height = image.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(image, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
    });
}



$('#consent').change(function () {  
if( $('#consent').is(":checked")==true && $('#consent2').is(":checked")==true){
	$('#bt_submit').prop('disabled',false)
	}else {
	$('#bt_submit').prop('disabled',true)
 
}});

$('#consent2').change(function () {  
if( $('#consent').is(":checked")==true && $('#consent2').is(":checked")==true){
	$('#bt_submit').prop('disabled',false)
	}else {
	$('#bt_submit').prop('disabled',true)
}})

$('#btnRest').change(function () {  
        signaturePad1.clear();
});

// Desired income
$('input:radio[name="desired_income"]').change(function () {
    if ($(this).val() == 'daily' || $(this).val() == 'monthly') {
        $('#desired_income_amount_display').show();
    } else {
        $('#desired_income_amount_display').hide();
    }
});

// Name prefix set display military
$('#name_prefix').change(function () {
    if ($(this).val() == 'นาย') {
        $('#military_display').show();
    } else {
        $('#military_display').hide();
    }
});

// Calculate age from birthday
$('#birthday').change(function () {
    var dayBirth = $(this).val();
    var getdayBirth = dayBirth.split("/");
    var YB = getdayBirth[2];
    var MB = getdayBirth[1];
    var DB = getdayBirth[0];

    var setdayBirth = moment(YB + "-" + MB + "-" + DB);
    var setNowDate = moment();
    var yearData = setNowDate.diff(setdayBirth, 'years', true); // ข้อมูลปีแบบทศนิยม 
    var yearReal = setNowDate.diff(setdayBirth, 'years'); // ปีจริง  
    var monthDiff = Math.floor((yearData - yearReal) * 12); // เดือน 
    $('#age_years').val(parseInt(yearReal) + 542);
    $('#age_months').val(parseInt(monthDiff) + 12);
});

// Calculate work experience
function work_date_from_change (work_from) {
    let work_rank = work_from.id.split("_");
    work_rank = work_rank[3];
    if(work_rank != undefined){
        work_rank = "_"+work_rank
    } else {
        work_rank = "";
    }
    const from = work_from.value;
    let to = $("#work_date_to"+work_rank).val();

    if(to == "ปัจจุบัน"){
        to = moment().add(543, 'year').format("DD/MM/YYYY")
    }
    
    if (to) {
        let from_date = from.split("/");
        let FY = from_date[2];
        let FM = from_date[1];
        let FD = from_date[0];
        let to_date = to.split("/");
        let TY = to_date[2];
        let TM = to_date[1];
        let TD = to_date[0];
        //Calculate
        let setfromday = moment(FY + "-" + FM + "-" + FD);
        let settoday = moment(TY + "-" + TM + "-" + TD);
        let yearfrom = settoday.diff(setfromday, 'years', true); // ข้อมูลปีแบบทศนิยม 
        let year_work = settoday.diff(setfromday, 'years'); // ปีจริง  
        let month_work = Math.floor((yearfrom-year_work)*12); // เดือน 
        $('#work_years'+work_rank).val(parseInt(year_work));
        $('#work_months'+work_rank).val(parseInt(month_work));
    } else {
        $('#work_years'+work_rank).val("");
        $('#work_months'+work_rank).val("");
    }
}
function work_date_to_change (work_to) {
    let work_rank = work_to.id.split("_");
    work_rank = work_rank[3];
    if(work_rank != undefined){
        work_rank = "_"+work_rank
    }
    else {
        work_rank = "";
    }
    const from = $("#work_date_from"+work_rank).val();
    const to = work_to.value;
    if (from) {
        let from_date = from.split("/");
        let FY = from_date[2];
        let FM = from_date[1];
        let FD = from_date[0];
        let to_date = to.split("/");
        let TY = to_date[2];
        let TM = to_date[1];
        let TD = to_date[0];
        //Calculate
        let setfromday = moment(FY + "-" + FM + "-" + FD);
        let settoday = moment(TY + "-" + TM + "-" + TD);
        let yearfrom = settoday.diff(setfromday, 'years', true); // ข้อมูลปีแบบทศนิยม 
        let year_work = settoday.diff(setfromday, 'years'); // ปีจริง  
        let month_work = Math.floor((yearfrom-year_work)*12); // เดือน 
        $('#work_years'+work_rank).val(parseInt(year_work));
        $('#work_months'+work_rank).val(parseInt(month_work));
    } else {
        $('#work_years'+work_rank).val("");
        $('#work_months'+work_rank).val("");
    }
}

function worktoday(work_rank) {
    if(work_rank != undefined){
        work_rank = "_"+work_rank
    }
    else {
        work_rank = "";
    }
    const to = moment().add(543, 'year').format("DD/MM/YYYY")
    $('#work_date_to'+work_rank).val(to);
    const from = $("#work_date_from"+work_rank).val();
    let check = $('#work_date_to'+work_rank).prop('disabled')
    if (check==false) {
        document.getElementById("work_date_to"+work_rank).disabled = true;
        document.getElementById("btn_today"+work_rank).style.backgroundColor = "#303030";
        document.getElementById("btn_today"+work_rank).style.color = "#ffffff";
    }
    else if (check==true) {
        document.getElementById("work_date_to"+work_rank).disabled = false;
        document.getElementById("btn_today"+work_rank).style.backgroundColor = "#ffffff";
        document.getElementById("btn_today"+work_rank).style.color = "#303030";
    }
    if (from) {
        let from_date = from.split("/");
        let FY = from_date[2];
        let FM = from_date[1];
        let FD = from_date[0];
        let to_date = to.split("/");
        let TY = to_date[2];
        let TM = to_date[1];
        let TD = to_date[0];
        //Calculate
        let setfromday = moment(FY + "-" + FM + "-" + FD);
        let settoday = moment(TY + "-" + TM + "-" + TD);
        let yearfrom = settoday.diff(setfromday, 'years', true); // ข้อมูลปีแบบทศนิยม 
        let year_work = settoday.diff(setfromday, 'years'); // ปีจริง  
        let month_work = Math.floor((yearfrom-year_work)*12); // เดือน 
        $('#work_years'+work_rank).val(parseInt(year_work));
        $('#work_months'+work_rank).val(parseInt(month_work));
        $('#work_date_to'+work_rank).val("ปัจจุบัน");
    } else {
        $('#work_years'+work_rank).val("");
        $('#work_months'+work_rank).val("");
        $('#work_date_to'+work_rank).val("ปัจจุบัน");
    }
  }


// Autocomplete Address Form
$.Thailand({
    $district: $('#current_address_subdistrict'),
    $amphoe: $('#current_address_district'),
    $province: $('#current_address_province'),
    $zipcode: $('#current_address_zipcode'),
});

// Crime status display case
$('input:radio[name="crime_status"]').change(function () {
    if ($(this).val() == 'ever') {
        $('#crime_case_display').show();
        signaturePad1.clear();
    } else {
        $('#crime_case_display').hide();
    }
});

// Congenital disease
$('input:radio[name="congenital_disease_status"]').change(function () {
    if ($(this).val() == 'have') {
        $('#congenital_disease_display').show();
    } else {
        $('#congenital_disease_display').hide();
    }
});


// hospital display
$('input:radio[name="hospital_status"]').change(function () {
    if ($(this).val() == 'have') {
        $('#hospital_detail_display').show();
    } else {
        $('#hospital_detail_display').hide();
    }
});

// Car
$('input:radio[name="car_owner"]').change(function () {
    if ($(this).val() == 'have') {
        $('#car_registration_number_display').show();
    } else {
        $('#car_registration_number_display').hide();
    }
});

// Motorcycle
$('input:radio[name="motorcycle_owner"]').change(function () {
    if ($(this).val() == 'have') {
        $('#motorcycle_registration_number_display').show();
    } else {
        $('#motorcycle_registration_number_display').hide();
    }
});

// Language
$('#language_add').click(function () {
    $("#language_tr").append(
        '<tr>' +
        '<td><div class="field"><input type="text" class="input" name="language[]" id="language" maxlength="100" placeholder="ระบุภาษา"></div></td>' +
        '<td><div class="select is-fullwidth"><select name="lang_listen[]" id="lang_listen"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>' +
        '<td><div class="select is-fullwidth"><select name="lang_speak[]" id="lang_speak"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>' +
        '<td><div class="select is-fullwidth"><select name="lang_read[]" id="lang_read"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>' +
        '<td><div class="select is-fullwidth"><select name="lang_write[]" id="lang_write"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>' +
        '</tr>'
    );
});

// Training
var training_rank = 1;
$('#training_add').click(function () {
	if($('#training_name').val().length==0){
		return
	}
	    training_rank++;
    $("#training_tr").append(
        '<tr>' +
        '<td><div class="field"><input type="text" class="input" name="training_name[]" id="training_name" maxlength="100" placeholder="ระบุชื่อหลักสูตร"></div></td>' +
        '<td><div class="field"><input type="text" class="input" name="training_insitname[]" id="training_insitname" maxlength="100" placeholder="ระบุสถาบัน"></div></td>' +
		'<td><div class="field"><input type="text" class="input" name="training_degree[]" id="training_degree" maxlength="100" placeholder="ระบุวุฒิที่ได้รับ"></div></td>' +
		'<td><div class="field"><input type="text" class="input" name="training_period[]" id="training_period" maxlength="100" placeholder="ระบุระยะเวลา"></div></td>' +
        '</tr>'
    );
});


// Education
var edu_rank = 1;
$('#edu_add').click(function () {
    edu_rank++;
    var edu_form =
        '<div id="edu_display_' + edu_rank + '">' +
        '<hr class="navbar-divider mb-5">' +
        '<h5 class="title is-5">ลำดับที่ ' + edu_rank +
        ' <button type="button" class="button is-danger is-outlined is-rounded is-small" id="edu_remove" onclick="return edu_removed(\'' + edu_rank + '\')">ลบ</button>' +
        '</h5>' +
        '<div class="columns">' +
        '<div class="column is-one-fifth">' +
        '<div class="field">' +
        '<label class="label">ระดับการศึกษา</label>' +
        '<div class="select is-fullwidth">' +
        '<select name="edu_level[]" id="edu_level" onchange="edu_level_bg($(this).val(), \'' + edu_rank + '\');">' +
        '<option value="">-- เลือก --</option>' +
        '<option value="ม.6/ปวช. หรือเทียบเท่า">ม.6/ปวช. หรือเทียบเท่า</option>' +
        '<option value="ปวส.">ปวส.</option>' +
        '<option value="ปริญญาตรี">ปริญญาตรี</option>' +
        '<option value="ปริญญาโท">ปริญญาโท</option>' +
        '<option value="ปริญญาเอก">ปริญญาเอก</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">ชื่อสถาบันการศึกษา</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="edu_name[]" id="edu_name" placeholder="ระบุชื่อสถาบันการศึกษา" maxlength="255">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="column is-one-fifth">' +
        '<div class="field">' +
        '<label class="label">ปี พ.ศ.ที่จบ</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="edu_year[]" id="edu_year" placeholder="หากกำลังศึกษาอยู่ให้ใส่ 0" maxlength="4" onkeypress="return inputNumbers(event);" pattern="\d+">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="columns">' +
        '<div class="column" id="edu_bg_display_' + edu_rank + '" style="display: none;">' +
        '<div class="field">' +
        '<label class="label">คณะ</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="edu_bg[]" id=edu_bg" placeholder="เช่น นิเทศศาสตรบัณฑิต" maxlength="255">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">สาขา</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="edu_branch[]" id="edu_branch" placeholder="ระบุสาขาที่เรียน" maxlength="255">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="column is-one-fifth">' +
        '<div class="field">' +
        '<label class="label">เกรดเฉลี่ย</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="edu_gpa[]" id="edu_gpa" placeholder="ระบุเกรดเฉลี่ย" maxlength="4" onkeypress="return inputNumbers(event);" pattern="\d+">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    $("#edu_display").append(edu_form);
});
function edu_level_bg(value, ref) {
    if (value == 'ปริญญาตรี' || value == 'ปริญญาโท' || value == 'ปริญญาเอก') {
        $('#edu_bg_display_' + ref).show();
    } else {
        $('#edu_bg_display_' + ref).hide();
    }
}
function edu_removed(ref) {
    $('#edu_display_' + ref).remove();
    edu_rank = ref - 1;
};

// Work
var work_rank = 1;
$('#work_add').click(function () {
    work_rank++;
    var work_form =
        '<div id="work_display_' + work_rank + '">' +
        '<hr class="navbar-divider mb-5">' +
        '<h5 class="title is-5">ลำดับที่ ' + work_rank +
        ' <button type="button" class="button is-danger is-outlined is-rounded is-small" id="work_remove" onclick="return work_removed(\'' + work_rank + '\')">ลบ</button>' +
        '</h5>' +
        '<div class="columns">' +
        '<div class="column is-three-fifths pb-0">' +
        '<label class="label">ระยะเวลา ตั้งแต่</label>' +
        '<div class="field has-addons">' +
        '<div class="control">' +
        '<input type="text" class="input" name="work_date_from[]" id="work_date_from_' + work_rank + '" placeholder="ระบุช่วงเวลาที่ทำงาน" data-maxdate="today" onchange="changetobe(this);work_date_from_change(this);">' +
        '</div>' +
        '<p class="control">' +
        '<a class="button is-static">' +
        'ถึง' +
        '</a>' +
        '</p>' +
        '<div class="control">' +
        '<input type="text" class="input" name="work_date_to[]" id="work_date_to_' + work_rank + '" placeholder="ระบุช่วงเวลาที่ทำงาน" data-maxdate="today" onchange="changetobe(this);work_date_to_change(this);">' +
        '</div>' +
        '<button type="button" class="button is-dark is-outlined" id="btn_today_' + work_rank + '" onclick="worktoday(' + work_rank + ')">'+
        '<span>ปัจจุบัน</span>'+
        '</button>'+
        '</div>' +
        '</div>' +
        '<div class="column">'+
        '<div class="field">'+
        '<label class="label">รวมระยะเวลาที่ทำงาน</label>'+
        '<div class="field has-addons">'+
        '<div class="control">'+
        '<input type="text" class="input" name="work_years[]" id="work_years_' + work_rank + '"'+
        'maxlength="2" onkeypress="return inputNumbers(event);"'+
        'pattern="\d+" readonly>'+
        '</div>'+
        '<div class="control">'+
        '<a class="button is-static">'+
        'ปี'+
        '</a>'+
        '</div>'+
        '<div class="control">'+
        '<input type="text" class="input" name="work_months[]" id="work_months_' + work_rank + '"'+
        'maxlength="2" onkeypress="return inputNumbers(event);"'+
        'pattern="\d+" readonly>'+
        '</div>'+
        '<div class="control">'+
        '<a class="button is-static">'+
        'เดือน'+
        '</a>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>' +
        '<div class="columns">' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">สถานที่ทำงาน</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="work_station[]" id="work_station" placeholder="ระบุชื่อสถานที่ทำงาน" maxlength="255">' +
        '</div>' +
        '</div>' +
        '<div class="columns">' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">ตำแหน่ง</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="work_position[]" id="work_position" placeholder="ระบุตำแหน่ง" maxlength="255">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">เงินเดือน</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="work_salary[]" id="work_salary" placeholder="ระบุเงินเดือน" maxlength="9" onkeypress="return inputNumbers(event);" pattern="\d+">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">เบอร์โทรศัพท์</label>' +
        '<div class="control">' +
        '<input type="text" class="input" name="work_telephone[]" id="work_telephone" placeholder="ระบุเบอร์โทรศัพท์" maxlength="10" onkeypress="return inputNumbers(event);" pattern="\d+">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="columns">' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">หน้าที่ความรับผิดชอบ</label>' +
        '<div class="control">' +
        '<textarea class="textarea" name="work_responsibility[]" id="work_responsibility" placeholder="ระบุหน้าที่ความรับผิดชอบ" maxlength="1000" rows="1"></textarea>' +
        '</div>' +
        '<p class="help">สามารถพิมพ์ได้ <span id="work_responsibility_chars">1,000</span> ตัวอักษร</p>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="columns">' +
        '<div class="column">' +
        '<div class="field">' +
        '<label class="label">เหตุผลในการลาออก</label>' +
        '<div class="control">' +
        '<textarea class="textarea" name="work_reason[]" id="work_reason" placeholder="ระบุเหตุผลในการลาออก" maxlength="500" rows="1"></textarea>' +
        '</div>' +
        '<p class="help">สามารถพิมพ์ได้ <span id="work_reason_chars">500</span> ตัวอักษร</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    $("#work_display").append(work_form);

    duDatepicker('#work_date_from_' + work_rank, {
        format: 'dd/mm/yyyy',
        theme: 'green',
        auto: true,
        i18n: th
    });
    duDatepicker('#work_date_to_' + work_rank, {
        format: 'dd/mm/yyyy',
        theme: 'green',
        auto: true,
        i18n: th
    });
});
function work_removed(ref) {
    $('#work_display_' + ref).remove();
    work_rank = ref - 1;
};

//** END FORM */

// Datepicker
duDatepicker('#work_start', {
    format: 'dd/mm/yyyy',
    theme: 'green',
    auto: true,
    i18n: th
});
function changetobe(datefe) {
    let date = $(datefe).val();
    date = date.split("/");
    const yearbe = parseInt(date[2]) + 543;
    date = date[0] + '/' + date[1] + "/" + yearbe;
    $(datefe).val(date);
}



  duDatepicker('#birthday', {
    format: 'dd/mm/yyyy',
    minDate: '1900-01-01',                // วันต่ำสุด
    maxDate: new Date(),                  // วันสูงสุด = วันนี้
    auto: true,
    theme: 'green',
    i18n: th
  });




duDatepicker('#work_date_from', {
    format: 'dd/mm/yyyy',
    theme: 'green',
    auto: true,
    i18n: th
});
duDatepicker('#work_date_to', {
    format: 'dd/mm/yyyy',
    theme: 'green',
    auto: true,
    i18n: th
});

// Function scroll to id
function scrollToID(id) {
    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 2000);
}

// Function send email
function sendEmail(type, mailTo, mailFrom, bodyPosition, bodyFullname, bodyTelephone, attachment) {
    $.ajax({
        type: "POST",
        url: "application/autoload.php",
        data: { type: type, to: mailTo, from: mailFrom, apply_position: bodyPosition, fullname: bodyFullname, telephone: bodyTelephone, attachment: attachment },
    });
}
        // refperson_prefix: 'required',
        // refperson_name: 'required',
        // refperson_position: 'required',
        // refperson_workstation: 'required',
        // refperson_telephone: 'required',
// Initialize form validation.
$('#registration_frm').validate({
    rules: {
 profile_image: 'required',
      idcard_image: 'required',
        apply_position: 'required',
        desired_income: 'required',
        desired_income_amount: 'required',
        work_start: 'required',
        name_prefix: 'required',
        firstname: 'required',
        lastname: 'required',
        nickname: 'required',
        eprefix: 'required',
        efirstname: 'required',
        elastname: 'required',
        nationalid: {
          required: true,
          minlength: 13,
          maxlength: 13,
          digits: true
        },
        weight: 'required',
        height: 'required',
        birthday: 'required',
        nationality: 'required',
        race: 'required',
        religion: 'required',
        telephone_number: 'required',
        email: {
            required: true,
            email: true
        },
        current_address: 'required',
        current_address_street: 'required',
        current_address_subdistrict: 'required',
        current_address_district: 'required',
        current_address_province: 'required',
        current_address_zipcode: 'required',
        current_address_status: 'required',
		namecontact:'required',
		relationcontact:'required',
		telcontact:'required',
		addresscontact:'required',
        marital_status: 'required',
        military_status: 'required',
		generalhealth: 'required',
		crimecheck_status:'required',
        crime_status: 'required',
        crime_case: 'required',
        congenital_disease_status: 'required',
        congenital_disease: 'required',
        hospital_status: 'required',
        hospital_detail: 'required',
        car_drive: 'required',
        motorcycle_drive: 'required',
        car_owner: 'required',
        motorcycle_owner: 'required',
        car_registration_number: 'required',
        motorcycle_registration_number: 'required',
        'edu_level[]': {
            required: true
        },
        'edu_name[]': {
            required: true
        },
        'edu_year[]': {
            required: true
        },
        'edu_bg[]': {
            required: true
        },
        'edu_branch[]': {
            required: true
        },
        'edu_gpa[]': {
            required: true
        },
        more_weakness: 'required',
        more_strength: 'required',
        more_reason: 'required',
        refperson_prefix: 'required',
        refperson_name: 'required',
        refperson_position: 'required',
        refperson_workstation: 'required',
        refperson_telephone: 'required',
      },
    messages: {
        profile_image: 'กรุณาเลือกไฟล์ภาพถ่าย',
        idcard_image:'กรุณาแนบหน้าบัตร',
        apply_position: 'กรุณาระบุตำแหน่งงานที่ต้องการสมัคร',
        desired_income: 'กรุณาระบุรายได้ที่ต้องการ',
        desired_income_amount: 'กรุณาระบุรายได้ที่ต้องการ',
        work_start: 'กรุณาระบุวันที่สามารถเริ่มทำงานได้',
        name_prefix: 'กรุณาเลือกคำนำหน้า',
        firstname: 'กรุณาระบุชื่อ',
        lastname: 'กรุณาระบุนามสกุล',
        ename_prefix: 'กรุณาเลือกคำนำหน้า-Eng',
        efirstname: 'กรุณาระบุชื่อ-Eng',
        elastname: 'กรุณาระบุนามสกุล-Eng',
        nationalid: {
          required: "กรุณาระบุเลขบัตรประชาชน",
          minlength: "เลขบัตรประชาชนต้องมีความยาว 13 หลัก",
          maxlength: "เลขบัตรประชาชนต้องมีความยาว 13 หลัก",
          digits: "กรุณากรอกเฉพาะตัวเลขเท่านั้น"
        },
        nickname: 'กรุณาระบุชื่อเล่น',
        weight: 'กรุณาระบุน้ำหนัก',
        height: 'กรุณาระบุส่วนสูง',
        birthday: 'กรุณาระบุ วัน/เดือน/ปี เกิด',
        nationality: 'กรุณาระบุสัญชาติ',
        race: 'กรุณาระบุเชื้อชาติ',
        religion: 'กรุณาระบุศาสนา',
        telephone_number: 'กรุณาระบุหมายเลขโทรศัพท์',
        email: 'กรุณาระบุอีเมล',
        current_address: 'กรุณาระบุที่อยู่ปัจจุบัน',
        current_address_street: 'กรุณาระบุถนน',
        current_address_subdistrict: 'กรุณาระบุ แขวง/ตำบล',
        current_address_district: 'กรุณาระบุ เขต/อำเภอ',
        current_address_province: 'กรุณาระบุจังหวัด',
        current_address_zipcode: 'กรุณาระบุรหัสไปรษณีย์',
        current_address_status: 'กรุณาระบุสถานะของที่อยู่ปัจจุบัน',
		namecontact:'กรุณาระบุชื่อ',
		relationcontact:'กรุณาระบุความสัมพันธ์',
		telcontact:'กรุณาระบุเบอร์โทร',
		addresscontact:'กรุณาระบุที่อยู่',
        marital_status: 'กรุณาระบุสถานภาพทางการสมรส',
        military_status: 'กรุณาระบุสถานภาพทางการคัดเลือกทหาร',
        car_drive: 'กรุณาระบุการขับรถยนต์',
        motorcycle_drive: 'กรุณาระบุการขับรถจักรยานยนต์',
        car_owner: 'กรุณาระบุรถยนต์ของตนเอง',
        motorcycle_owner: 'กรุณาระบุรถจักรยานยนต์ของตนเอง',
        car_registration_number: 'กรุณาระบุเลขทะเบียนรถ',
        motorcycle_registration_number: 'กรุณาระบุเลขทะเบียนรถ',
        'edu_level[]': 'กรุณาเลือกระดับการศึกษา',
        'edu_name[]': 'กรุณาระบุชื่อสถาบันการศึกษา',
        'edu_year[]': 'กรุณาระบุปี พ.ศ.ที่จบ',
        'edu_bg[]': 'กรุณาระบุคณะ',
        'edu_branch[]': 'กรุณาระบุสาขา',
        'edu_gpa[]': 'กรุณาระบุเกรดเฉลี่ย',
        'work_date_from[]': 'กรุณาระบุระยะเวลาที่ทำงาน',
        'work_date_to[]': 'กรุณาระบุระยะเวลาที่ทำงาน',
        'work_station[]': 'กรุณาระบุสถานที่ทำงาน',
        'work_position[]': 'กรุณาระบุตำแหน่ง',
        'work_salary[]': 'กรุณาระบุเงินเดือน',
        'work_telephone[]': 'กรุณาระบุเบอร์โทรศัพท์',
        'work_responsibility[]': 'กรุณาระบุหน้าที่ความรับผิดชอบ',
        'work_reason[]': 'กรุณาระบุเหตุผลในการลาออก',
        refperson_prefix: 'กรุณาระบุคำนำหน้า',
        refperson_name: 'กรุณาระบุ ชื่อ - นามสกุล',
        refperson_position: 'กรุณาระบุตำแหน่ง',
        refperson_workstation: 'กรุณาระบุสถานที่ทำงาน',
        refperson_telephone: 'กรุณาระบุหมายเลขโทรศัพท์',
		generalhealth: 'กรุณาระบุข้อมูลสุขภาพทั่วไป',
		crimecheck_status:'กรุณาระบุความยินยอมการเช็คประวัติอาชญากรรม',
        crime_status: 'กรุณาระบุการต้องโทษ',
        crime_case: 'กรุณาระบุคดีที่เคยต้องโทษ',
        congenital_disease_status: 'กรุณาระบุข้อมูลสุขภาพ',
        congenital_disease: 'กรุณาระบุข้อมูลสุขภาพ',
        hospital_status:'กรุณาระบุการเข้ารพ.',
        hospital_detail:'กรุณาระบุสาเหตุการเข้ารพ.',        
        more_weakness: 'กรุณาบอกจุดอ่อนของตนเอง',
        more_strength: 'กรุณาบอกจุดแข็งของตนเอง',
        more_reason: 'กรุณาระบุเหตุผลที่เลือกสมัครงานที่นี่',
        more_who: 'กรุณาระบุบุคคลที่คุณรู้จักที่นี่',
        more_who_position: 'กรุณาระบุตำแหน่งของบุคคลที่คุณรู้จัก',
        consent:'กรุณายืนยันข้อมูลการสมัคร'
    },
    wrapper: 'span',
    onfocusout: function (element) {
        $(element).valid();
    },
    errorPlacement: function (error, element) {
        error.addClass('has-text-danger help');
        if (element.prop('name') == 'desired_income') {
            error.appendTo('#desired_income_error');
        } else if (element.prop('name') == 'current_address_status') {
            error.appendTo('#current_address_status_error');
        } else if (element.prop('name') == 'marital_status') {
            error.appendTo('#marital_error');
        } else if (element.prop('name') == 'military_status') {
            error.appendTo('#military_error');
        } else if (element.prop('name') == 'crime_status') {
            error.appendTo('#crime_error');
		} else if (element.prop('name') == 'crimecheck_status') {
            error.appendTo('#crimecheck_error');			
        } else if (element.prop('name') == 'congenital_disease_status') {
            error.appendTo('#congenital_disease_error');
        } else if (element.prop('name') == 'hospital_status') {
            error.appendTo('#hospital_status_error');            
        } else if (element.prop('name') == 'car_drive') {
            error.appendTo('#car_drive_error');
        } else if (element.prop('name') == 'motorcycle_drive') {
            error.appendTo('#motorcycle_drive_error');
        } else if (element.prop('name') == 'car_owner') {
            error.appendTo('#car_owner_error');
        } else if (element.prop('name') == 'motorcycle_owner') {
            error.appendTo('#motorcycle_owner_error');
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler:function (form) {
		Swal.fire({
            icon: 'question',
            title: 'ยืนยันข้อมูล?',
            html: 'เมื่อยืนยันข้อมูลแล้ว จะไม่สามารถแก้ไขข้อมูลได้ <br/>คุณแน่ใจหรือไม่?',
            confirmButtonText: 'ยืนยันข้อมูล',
            confirmButtonColor: '#8CBA40',
            showCancelButton: true,
            cancelButtonText: 'แก้ไขข้อมูล'
        }).then((result) => {
            if (result.isConfirmed) {
			build_pdf();
							//objexp.pdf=$('#download_btn').attr('href')
				   postData(exportData,"addApplicant");
            } 
        })

    }
});

// Initialize build PDF with PDFMake.
function build_pdf() {



    // *** PARAMETERS ***
    // Logo
	var dat ={}
    var logo_base64 = $('#logo_base64').val();
    var consent_base64=$('#consent_base64').val();
	var signimgs=$('#SignupImage1').val();
	
    // Profile image
    var profile_image = $('#profile_image_base64').val();
    var idcard_image =$('#idcard_image_base64').val();
    //console.log(profile_image)
    // Date
    // var dateNow = new Date();
    // var today = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
    var today = moment().add(543, 'year').format("DD/MM/YYYY")
    var comp =  $('#comp').val();

    // Apply position
    var apply_position = $('#apply_position').val();

    // Desired Income
    var desired_income_amount = $('#desired_income_amount').val();
    if ($('input[name="desired_income"]:checked').val() == 'daily') {
        var desired_income = 'รายวัน ' + desired_income_amount;
    } else if ($('input[name="desired_income"]:checked').val() == 'monthly') {
        var desired_income = 'รายเดือน ' + desired_income_amount;
    } else {
        var desired_income = $('input[name="desired_income"]:checked').val();
    }
    
    // Work start
    var work_start = $('#work_start').val();

    // Profile
    var prefix = $('#name_prefix').val();
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var nickname = $('#nickname').val();
    var eprefix = $('#ename_prefix').val();
    var efirstname = $('#efirstname').val();
    var elastname = $('#elastname').val();
    var nationalid = $('#nationalid').val();
    var weight = $('#weight').val();
    var height = $('#height').val();
    var birthday = $('#birthday').val();
    var age_years = $('#age_years').val();
    var age_months = $('#age_months').val();
    var nationality = $('#nationality').val();
    var race = $('#race').val();
    var religion = $('#religion').val();
    var child = $('#child').val();

    // Contact
    var telephone_number = $('#telephone_number').val();
    var email = $('#email').val();

    // Address
    var current_address = $('#current_address').val();
    var current_address_street = $('#current_address_street').val();
    var current_address_subdistrict = $('#current_address_subdistrict').val();
    var current_address_district = $('#current_address_district').val();
    var current_address_province = $('#current_address_province').val();
    var current_address_zipcode = $('#current_address_zipcode').val();
	var namecontact = $('#namecontact').val();
	var relationcontact = $('#relationcontact').val();
	var telcontact = $('#telcontact').val();
	var addresscontact = $('#addresscontact').val() ;	
    if ($('input[name="current_address_status"]:checked').val() == 'self_house') {
        var current_address_status = 'บ้านตนเอง';
    } else if ($('input[name="current_address_status"]:checked').val() == 'rent_house') {
        var current_address_status = 'บ้านเช่า';
    } else {
        var current_address_status = 'อื่น ๆ';
    }

    // Marital status
    if ($('input[name="marital_status"]:checked').val() == 'single') {
        var marital_status = 'โสด';
    } else if ($('input[name="marital_status"]:checked').val() == 'marry') {
        var marital_status = 'สมรส';
    } else if ($('input[name="marital_status"]:checked').val() == 'divorce') {
        var marital_status = 'หย่า';
    } else if ($('input[name="marital_status"]:checked').val() == 'unregister') {
        var marital_status = 'ไม่จดทะเบียน';
    } else {
        var marital_status = 'อื่น ๆ';
    }

    // Military status
    if ($('input[name="military_status"]:checked').val() == 'passed') {
        military_display = { text: 'การทหาร', bold: true };
        var military_status = ': ผ่านการคัดเลือกทหารแล้ว';
    } else if ($('input[name="military_status"]:checked').val() == 'notpassed') {
        military_display = { text: 'การทหาร', bold: true };
        var military_status = ': ยังไม่ผ่านการคัดเลือกทหาร';
    } else if ($('input[name="military_status"]:checked').val() == 'exempt') {
        military_display = { text: 'การทหาร', bold: true };
        var military_status = ': ได้รับการยกเว้น';
    } else {
        military_display = '';
        var military_status = '';
    }

    // Crime status
    if ($('input[name="crime_status"]:checked').val() == 'never') {
        var crime_status = 'ไม่เคยต้องโทษ';
    } else if ($('input[name="crime_status"]:checked').val() == 'ever') {
        var crime_status = 'เคยต้องโทษ: - คดี ' + $('#crime_case').val();
    } else {
        var crime_status = 'อื่น ๆ';
    }

	if ($('input[name="crimecheck_status"]:checked').val() == 'no') {
        var crimecheck_status = 'ไม่ยินยอม';
    } else if ($('input[name="crimecheck_status"]:checked').val() == 'yes') {
        var crimecheck_status = 'ยินยอม ' ;
    }
	
    // Congenital disease status
    if ($('input[name="congenital_disease_status"]:checked').val() == 'not_have') {
        var congenital_disease_status = 'ไม่มี';
    } else if ($('input[name="congenital_disease_status"]:checked').val() == 'have') {
        var congenital_disease_status = 'มี: - ' + $('#congenital_disease').val();
    } else {
        var congenital_disease_status = 'อื่น ๆ';
    }

   if ($('input[name="hospital_status"]:checked').val() == 'not_have') {
        var hospital_status = 'ไม่มี';
    } else if ($('input[name="hospital_status"]:checked').val() == 'have') {
        var hospital_status = 'มี: - ' + $('#hospital_detail').val();
    } else {
        var hospital__status = 'อื่น ๆ';
    }
	
	var generalhealth = $('#generalhealth').val();

    // Education
    var edu_name = $("input[name='edu_name[]']").map(function () { return $(this).val(); }).get(); //! School name
    var edu_level = $("select[name='edu_level[]']").map(function () { return $(this).val(); }).get(); //! Education level
    var edu_bg = $("input[name='edu_bg[]']").map(function () { return $(this).val(); }).get(); //! Educational background
    var edu_branch = $("input[name='edu_branch[]']").map(function () { return $(this).val(); }).get(); //! Branch
    var edu_gpa = $("input[name='edu_gpa[]']").map(function () { return $(this).val(); }).get(); //! GPA
    var edu_year = $("input[name='edu_year[]']").map(function () { return $(this).val(); }).get(); //! Graduation year
    var edu_data_table = [];
	var arr_edu=[];
    for (var i = 0; i < edu_name.length; i++) {
        if (edu_bg[i] == '') {
            var edu_bg_display = '';
            var edu_bg_data = '';
        } else {
            var edu_bg_display = { text: 'คณะ', bold: true };
            var edu_bg_data = { text: ': ' + edu_bg[i] };
        }
        edu_data_table.push(
            [{ text: i + 1 + '. ' + edu_name[i], bold: true, colSpan: 2 }, {}],
            [{ text: 'ระดับการศึกษา', bold: true }, { text: ': ' + edu_level[i] }],
			[edu_bg_display, edu_bg_data],
            [{ text: 'สาขา', bold: true }, { text: ': ' + edu_branch[i] }],
            [{ text: 'เกรดเฉลี่ย', bold: true }, { text: ': ' + (edu_year[i]==0?"-":edu_gpa[i]) }],
            [{ text: 'ปีการศึกษา', bold: true }, { text: ': ' + (edu_year[i]==0?"กำลังศึกษา":' พ.ศ.' +edu_year[i]) }],
            [{ text: '  ', colSpan: 2 }, {}]
        );
		arr_edu.push([edu_name[i],edu_level[i],edu_bg[i],edu_branch[i],(edu_year[i]==0?0:edu_gpa[i]),edu_year[i]])
    }

    // Work
    var work_date_from = $("input[name='work_date_from[]']").map(function () { return $(this).val(); }).get(); //! Old work date 
    var work_date_to = $("input[name='work_date_to[]']").map(function () { return $(this).val(); }).get(); //! Old work date
    var work_years = $("input[name='work_years[]']").map(function () { return $(this).val(); }).get(); //! Old work years
    var work_months = $("input[name='work_months[]']").map(function () { return $(this).val(); }).get(); //! Old work months
    var work_station = $("input[name='work_station[]']").map(function () { return $(this).val(); }).get(); //! Old work station
    var work_position = $("input[name='work_position[]']").map(function () { return $(this).val(); }).get(); //! Old work position
    var work_salary = $("input[name='work_salary[]']").map(function () { return $(this).val(); }).get(); //! Old work salary
    var work_telephone = $("input[name='work_telephone[]']").map(function () { return $(this).val(); }).get(); //! Old work telephone
    var work_responsibility = $("textarea[name='work_responsibility[]']").map(function () { return $(this).val(); }).get(); //! Old work responsibility
    var work_reason = $("textarea[name='work_reason[]']").map(function () { return $(this).val(); }).get(); //! Old work reason
     work_data_table = [];
    for (var i = 0; i < work_station.length; i++) {
        work_data_table.push(
            [{ text: i + 1 + '. ' + work_station[i], bold: true, colSpan: 4 }, {}, {}, {}],
            [{ text: 'ระยะเวลา', bold: true }, { text: ': ' + work_date_from[i] + ' - ' + work_date_to[i] }, { text: 'เป็นเวลา', bold: true }, { text: ': ' + work_years[i] +" ปี " + work_months[i] + " เดือน"}],
            [{ text: 'ตำแหน่ง', bold: true }, { text: ': ' + work_position[i] }, { text: 'เงินเดือน', bold: true }, { text: ': ' + work_salary[i] + ' บาท' }],
            [{ text: 'เบอร์โทรศัพท์', bold: true }, { text: ': ' + work_telephone[i] }, {}, {}],
            [{ text: 'หน้าที่ความรับผิดชอบ:', bold: true, colSpan: 4 }, {}, {}, {}],
            [{ text: '- ' + work_responsibility[i], colSpan: 4 }, {}, {}, {}],
            [{ text: 'สาเหตุที่ลาออก:', bold: true, colSpan: 4 }, {}, {}, {}],
            [{ text: '- ' + work_reason[i], colSpan: 4 }, {}, {}, {}],
            [{ text: '  ', colSpan: 4 }, {}, {}, {}]
        );
    }
    var work_data = [];
	var arr_workdat=[];
    for (var i = 0; i < work_station.length; i++) {
        work_data[i] = [i + 1, work_date_from[i] + ' - ' + work_date_to[i], work_years[i], work_months[i] , work_station[i], work_position[i], work_salary[i], work_telephone[i], work_responsibility[i], work_reason[i]]
		arr_workdat.push([work_date_from[i],work_date_to[i], work_years[i], work_months[i] ,work_station[i],work_position[i], work_salary[i], work_telephone[i], work_responsibility[i], work_reason[i]])
    }
    
    // Language
    function language_convert_val(data) {
        var result;
        if (data == 'fair') {
            result = 'พอใช้'
        } else if (data == 'good') {
            result = 'ดี'
        } else if (data == 'verygood') {
            result = 'ดีมาก'
        } else {
            result = '-'
        }
        return result;
    }
    var language_name = $("input[name='language[]']").map(function () { return $(this).val(); }).get(); //! Language
    var lang_listen = $("select[name='lang_listen[]']").map(function () { return $(this).val(); }).get(); //! Listen
    var lang_speak = $("select[name='lang_speak[]']").map(function () { return $(this).val(); }).get(); //! Speak
    var lang_read = $("select[name='lang_read[]']").map(function () { return $(this).val(); }).get(); //! Read
    var lang_write = $("select[name='lang_write[]']").map(function () { return $(this).val(); }).get(); //! Write
    var language_data = [];
	var arr_langdat=[];
    language_data.push([{ text: 'ภาษา', bold: true }, { text: 'การฟัง', bold: true, alignment: 'center' }, { text: 'การพูด', bold: true, alignment: 'center' }, { text: 'การอ่าน', bold: true, alignment: 'center' }, { text: 'การเขียน', bold: true, alignment: 'center' }]);
    for (var i = 0; i < language_name.length; i++) {
        language_data.push([
            language_name[i],
            { text: language_convert_val(lang_listen[i]), alignment: 'center' },
            { text: language_convert_val(lang_speak[i]), alignment: 'center' },
            { text: language_convert_val(lang_read[i]), alignment: 'center' },
            { text: language_convert_val(lang_write[i]), alignment: 'center' }
        ]);
		arr_langdat.push([language_name[i],lang_listen[i],lang_speak[i],lang_read[i],lang_write[i]])
    }
	
	

	var training_name = $("input[name='training_name[]']").map(function () { return $(this).val(); }).get(); //!
	var training_insitname = $("input[name='training_insitname[]']").map(function () { return $(this).val(); }).get(); //!
	var training_degree = $("input[name='training_degree[]']").map(function () { return $(this).val(); }).get(); //!
	var training_period = $("input[name='training_period[]']").map(function () { return $(this).val(); }).get(); //!
    
    var training_data = [];
	var arr_trainingdat=[];
    training_data.push([{ text: 'หลักสูตร', bold: true, alignment: 'center' }, { text: 'สถาบัน', bold: true, alignment: 'center' }, { text: 'วุฒิ', bold: true, alignment: 'center' }, { text: 'ระยะเวลา', bold: true, alignment: 'center' }]);
    for (var i = 0; i < training_name.length; i++) {
		if(training_name[i].length==0){
		  training_name[i]="-"
		  training_insitname[i]="-"
		  training_degree[i]="-"
		  training_period[i]="-"
		}
		training_data.push([training_name[i],training_insitname[i],training_degree[i],training_period[i]]);
		arr_trainingdat.push([training_name[i],training_insitname[i],training_degree[i],training_period[i]]);
    }
	

    // Vehicle (Car)
    if ($('input[name="car_drive"]:checked').val() == 'can') {
        var car_drive = 'ขับได้';
    } else if ($('input[name="car_drive"]:checked').val() == 'cannot') {
        var car_drive = 'ขับไม่ได้';
    } else {
        var car_drive = '-';
    }
    if ($('input[name="car_owner"]:checked').val() == 'have') {
        var car_owner = 'มี, ทะเบียน: ' + $('#car_registration_number').val();
    } else {
        var car_owner = 'ไม่มี';
    }

    // Vehicle (Motorcycle)
    if ($('input[name="motorcycle_drive"]:checked').val() == 'can') {
        var motorcycle_drive = 'ขับได้';
    } else if ($('input[name="motorcycle_drive"]:checked').val() == 'cannot') {
        var motorcycle_drive = 'ขับไม่ได้';
    } else {
        var motorcycle_drive = '-';
    }
    if ($('input[name="motorcycle_owner"]:checked').val() == 'have') {
        var motorcycle_owner = 'มี, ทะเบียน: ' + $('#motorcycle_registration_number').val() + '\n';
    } else {
        var motorcycle_owner = 'ไม่มี';
    }

    // Reference person
    var refperson_prefix = $('#refperson_prefix').val();
    var refperson_name = $('#refperson_name').val();
    var refperson_position = $('#refperson_position').val();
    var refperson_workstation = $('#refperson_workstation').val();
    var refperson_telephone = $('#refperson_telephone').val();

    // More
    var more_weakness = $('#more_weakness').val();
    var more_strength = $('#more_strength').val();
    var more_reason = $('#more_reason').val();
    var more_who = $('#more_who').val();
    var more_who_position = $('#more_who_position').val();
	  var fullnamefooter='( ' + $('#name_prefix').val() + $('#firstname').val() + ' ' + $('#lastname').val() +' )'
    // *** END PARAMETERS ***

    // *** SET PREVIEW DATA ***
    // Profile
    $('#preview_date_now').text(today);
    $('#preview_profile_image').attr('src',profile_image);
    $('#preview_idcard_image').attr('src',idcard_image);
    $('#preview_apply_position').text(apply_position);
    $('#preview_desired_income').text(desired_income);
    $('#preview_work_start').text(work_start);
    $('#preview_fullname').text(prefix + firstname + ' ' + lastname + ' (' + nickname + ')');
    $('#preview_efullname').text(eprefix + efirstname + ' ' + elastname );
    $('#preview_weight').text(weight);
    $('#preview_height').text(height);
    $('#preview_birthday').text(birthday + ' (' + age_years + ' ปี ' + age_months + ' เดือน)');
    $('#preview_nationality').text(nationality);
    $('#preview_race').text(race);
    $('#preview_religion').text(religion);
    $('#preview_nationalid').text(nationalid);
    $('#preview_telephone').text(telephone_number);
    $('#preview_email').text(email);
	$('#preview_namecontact').text(namecontact);
	$('#preview_relationcontact').text(relationcontact);
	$('#preview_telcontact').text(telcontact);
	$('#preview_addresscontact').text(addresscontact) ;	

    // Address
    $('#preview_address').text(current_address + ' ถ.' + current_address_street + ' ต.' + current_address_subdistrict + ' อ.' + current_address_district + ' จ.' + current_address_province + ' ' + current_address_zipcode);
    $('#preview_address_status').text(current_address_status);

    // Military
    if (military_display != '') {
        $('#preview_military_display').show();
        $('#preview_military').text(military_status);
    } else {
        $('#preview_military_display').hide();
        $('#preview_military').text('-');
    }

    // Status
    $('#preview_child').text(child);
    $('#preview_marital').text(marital_status);


    // Education
    var preview_edu_data = [];
    for (var i = 0; i < edu_name.length; i++) {
        if (edu_bg[i] == '') {
            var preview_edu_bg = '';
        } else {
            var preview_edu_bg =
                '<div class="columns mb-0">' +
                '<div class="column is-one-third has-text-weight-bold py-0">คณะ</div>' +
                '<div class="column py-0 pb-4">: ' + edu_bg[i] + '</div>' +
                '</div>'
        }
        preview_edu_data.push(
            '<div class="mb-4">' +
            '<div class="columns mb-0">' +
            '<div class="column has-text-weight-bold py-0 pb-4">' + (i + 1) + '. ' + edu_name[i] + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">ระดับการศึกษา</div>' +
            '<div class="column py-0 pb-4">: ' + edu_level[i] + '</div>' +
            '</div>' +
            preview_edu_bg +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">สาขา</div>' +
            '<div class="column py-0 pb-4">: ' + edu_branch[i] + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">เกรดเฉลี่ย</div>' +
            '<div class="column py-0 pb-4">: ' + (edu_year[i]==0?"-":edu_gpa[i]) + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">ปีการศึกษา</div>' +
            '<div class="column py-0 pb-4">: ' + (edu_year[i]==0?"กำลังศึกษา":"พ.ศ."+edu_year[i]) + '</div>' +
            '</div>' +
            '</div>'
        );
    }
    $('#preview_edu').html(preview_edu_data);

    // Work
    var preview_work_data = [];
    for (var i = 0; i < work_station.length; i++) {
        preview_work_data.push(
            '<div class="mb-4">' +
            '<div class="columns mb-0">' +
            '<div class="column has-text-weight-bold py-0 pb-4">' + (i + 1) + '. ' + work_station[i] + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column py-0">' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">ระยะเวลา</div>' +
            '<div class="column py-0 pb-4">: ' + work_date_from[i] + ' - ' + work_date_to[i] + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">ตำแหน่ง</div>' +
            '<div class="column py-0 pb-4">: ' + work_position[i] + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">เบอร์โทรศัพท์</div>' +
            '<div class="column py-0 pb-4">: ' + work_telephone[i] + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="column py-0">' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">เป็นเวลา</div>' +
            '<div class="column py-0 pb-4">: ' + work_years[i] +" ปี " + work_months[i] + " เดือน" + '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column is-one-third has-text-weight-bold py-0">เงินเดือน</div>' +
            '<div class="column py-0 pb-4">: ' + work_salary[i] + ' บาท</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column py-0 pb-4" style="white-space: pre-wrap;">' +
            '<span class="has-text-weight-bold">หน้าที่ความรับผิดชอบ:</span><br/>' +
            '- ' + work_responsibility[i] +
            '</div>' +
            '</div>' +
            '<div class="columns mb-0">' +
            '<div class="column py-0 pb-4" style="white-space: pre-wrap;">' +
            '<span class="has-text-weight-bold">สาเหตุที่ลาออก:</span><br/>' +
            '- ' + work_reason[i] +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    $('#preview_work').html(preview_work_data);

    // Language
    var preview_language_data = [];
    for (var i = 0; i < language_name.length; i++) {
        preview_language_data.push(
            '<tr>' +
            '<td>' + language_name[i] + '</td>' +
            '<td class="has-text-centered">' + language_convert_val(lang_listen[i]) + '</td>' +
            '<td class="has-text-centered">' + language_convert_val(lang_speak[i]) + '</td>' +
            '<td class="has-text-centered">' + language_convert_val(lang_read[i]) + '</td>' +
            '<td class="has-text-centered">' + language_convert_val(lang_write[i]) + '</td>' +
            '</tr>'
        );
    }
    $('#preview_language').html(preview_language_data);

    //Trianing
	var preview_training_data = [];
    for (var i = 0; i < training_name.length; i++) {
        preview_training_data.push(
            '<tr>' +
            '<td>' + training_name[i] + '</td>' +
			'<td>' + training_insitname[i] + '</td>' +
			'<td>' + training_degree[i] + '</td>' +
			'<td>' + training_period[i] + '</td>' +
            '</tr>'
        ); 
    }
    $('#preview_training').html(preview_training_data);

    // Vehicle
    $('#preview_car_drive').text(car_drive);
    $('#preview_motorcycle_drive').text(motorcycle_drive);
    $('#preview_car_owner').text(car_owner);
    $('#preview_motorcycle_owner').text(motorcycle_owner);

    // Referrence person
    $('#preview_ref_name').text(refperson_prefix + refperson_name);
    $('#preview_ref_telephone').text(refperson_telephone);
    $('#preview_ref_workstation').text(refperson_workstation);
    $('#preview_ref_position').text(refperson_position);

    // More
    $('#preview_crime').html(crime_status.replace(/\n/g, '<br/>'));
	$('#preview_crimecheck').html(crimecheck_status.replace(/\n/g, '<br/>'));
    $('#preview_congenital_disease').html(congenital_disease_status.replace(/\n/g, '<br/>'));
    $('#preview_hospital').html(hospital_status.replace(/\n/g, '<br/>'));
	$('#preview_generalhealth').html(generalhealth.replace(/\n/g, '<br/>'));
    $('#preview_more_weakness').text(more_weakness);
    $('#preview_more_strength').text(more_strength);
    $('#preview_more_reason').text(more_reason);
	$('#preview_more_fnfooter').text(fullnamefooter);
    $('#preview_more_who').text(more_who);
    $('#preview_more_who_position').text(more_who_position);


	//console.log("Check footer:"+fullnamefooter)
    // *** END SET PREVIEW DATA ***

    // Text in table no line and bordered in PDFMake
    var tableNoLineAndBorder = {
        hLineWidth: function hLineWidth(i) { return 0; },
        vLineWidth: function vLineWidth(i) { return 0; },
        paddingLeft: function (i, node) { return 0; },
        paddingRight: function (i, node) { return 0; },
        paddingTop: function (i, node) { return 0; },
        paddingBottom: function (i, node) { return 0; },
    }
	
	
    // PDF font
    pdfMake.fonts = {
        THSarabun: {
            normal: 'https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew-webfont.ttf',
            bold: 'https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_bold-webfont.ttf',
            italics: 'https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_italic-webfont.ttf',
            bolditalics: 'https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_bolditalic-webfont.ttf'
        }
    }

    // PDF doc detail

    var docDefinition = {
        pageSize: 'A4',
        info: {
            title: 'ใบสมัครงาน บริษัท  (ประเทศไทย) จำกัด'
        },
        content: [       
			{
                image: logo_base64,
                width: 100,
                margin: [0, -10, 0, 5],
                style: 'logo'
            },                
             {
                // Column work detail
                columns: [
                       {
                        image: profile_image,
                        width: 100,
                        alignment: 'left'
					   },{
                        width: '75%',
                        alignment: 'left',
                        stack: [
                            {
                                text: 'ใบสมัครงาน',
                                style: 'header',
                                margin: [-100, 0, 0, 0]
                            }, {
                                text: [
                                    {
                                        text: 'วันที่สมัคร',
                                        bold: true
                                    }, {
                                        text: ' : ' + today
                                    }
                                ],
                                style: 'rightText'
                            }, {
                                table: {
                                    widths: [110, 'auto'],
                                    body: [
                                        [{ text: 'สมัครในตำแหน่ง', bold: true }, ': ' + apply_position],
                                        [{ text: 'รายได้ที่ต้องการ', bold: true }, ': ' + desired_income + ' บาท'],
                                        [{ text: 'วันที่สามารถเริ่มทำงานได้', bold: true }, ': ' + work_start],
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }
                        ],
                        style: 'contentDetail'
                    }
                ], columnGap: 20
            }, {
                // Column main data (profile, address, education)
                columns: [
                    {
                        // Left column
                        width: '50%',
                        alignment: 'left',
                        margin: [0, 10, 0, 0],
                        style: ['contentDetail'],
                        stack: [
                            {
                                text: 'ประวัติส่วนตัว\n',
                                style: 'subHeader'
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                // Profile
                                margin: [0, 0, 0, 20],
                                table: {
                                    widths: [65, 'auto', 40, '*'],
                                    body: [
                                        [{ text: 'ชื่อ - สกุล', bold: true }, { text: ': ' + prefix + firstname + ' ' + lastname + ' (' + nickname + ')', colSpan: 3 }, {}, {}],
                                        [{}, { text: ': ' + eprefix + efirstname + ' ' + elastname , colSpan: 3 }, {}, {}],                                        
                                        [{ text: 'น้ำหนัก', bold: true }, ': ' + weight + ' ก.ก.', { text: 'ส่วนสูง', bold: true }, ': ' + height + ' ซ.ม.'],
                                        [{ text: 'วันเดือนปีเกิด', bold: true }, { text: ': ' + birthday + ' (' + age_years + ' ปี ' + age_months + ' เดือน)', colSpan: 3 }, {}, {}],
                                        [{ text: 'สัญชาติ', bold: true }, ': ' + nationality, { text: 'เชื้อชาติ', bold: true }, ': ' + race],
                                        [{ text: 'ศาสนา', bold: true }, { text: ': ' + religion, colSpan: 3 }, {}, {}],
                                        [{ text: 'เลขบัตรประชาชน', bold: true }, { text: ': ' + nationalid, colSpan: 3 }, {}, {}],                                        
                                        [{ text: 'เบอร์โทรศัพท์', bold: true }, { text: ': ' + telephone_number, colSpan: 3 }, {}, {}],
                                        [{ text: 'อีเมล์', bold: true }, { text: ': ' + email, colSpan: 3 }, {}, {}]
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }, {
                                text: 'ที่อยู่ปัจจุบัน\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                // Address
                                text: '- ' + current_address + ' ถ.' + current_address_street +
                                    ' ต.' + current_address_subdistrict +
                                    ' อ.' + current_address_district +
                                    ' จ.' + current_address_province + '\n' +
                                    ' รหัสไปรษณีย์ ' + current_address_zipcode + '\n' +
                                    ' - ' + current_address_status + '\n\n'
                            }
							,  {
                                text: 'สถานภาพ\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                table: {
                                    widths: [60, 'auto'],
                                    body: [
                                        [{ text: 'การสมรส', bold: true }, ': ' + marital_status],
                                        [{ text: 'บุตร', bold: true }, ': ' + child],
                                        [military_display, military_status]
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }
                        ]
                    }, {
                        // Right column
                        alignment: 'left',
                        margin: [0, 10, 0, 0],
                        style: ['contentDetail'],
                        stack: [
                            {
                                text: 'ประวัติการศึกษา\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                table: {
                                    widths: [70, 'auto'],
                                    body: edu_data_table
                                },
                                layout: tableNoLineAndBorder
                            }
                        ]
                    }
                ], columnGap: 15
            }, {
                pageBreak: 'before',
                // Column main data (working, language, vehicle, more)
                columns: [
                    {
                        // Left column
    
                        margin: [0, 20, 0, 0],
                        style: ['contentDetail'],
                        stack: [
                            {
                                text: 'ทักษะทางภาษา\n',
                                style: 'subHeader',
                            }, {
                                table: {
                                    headerRows: 1,
                                    widths: ['*', '*', '*', '*', '*'],
                                    body: language_data
                                }
                            }, {
                                margin: [0, 20, 0, 0],
                                text: 'บุคคลอ้างอิง\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                table: {
                                    widths: [80, 'auto'],
                                    body: [
                                        [{ text: 'ชื่อ - สกุล', bold: true }, ': ' + refperson_prefix + refperson_name],
                                        [{ text: 'เบอร์โทรศัพท์', bold: true }, ': ' + refperson_telephone],
                                        [{ text: 'สถานที่ทำงาน', bold: true }, ': ' + refperson_workstation],
                                        [{ text: 'ตำแหน่ง', bold: true }, ': ' + refperson_position],
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }

                        ]
                    }, {
                        // Right column
  
                        margin: [0, 20, 0, 0],
                        style: ['contentDetail'],
                        stack: [
                            {
                                text: 'ยานพาหนะ\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                text: 'ความสามารถในการขับขี่',
                                bold: true
                            }, {
                                table: {
                                    widths: [80, 'auto'],
                                    body: [
                                        [{ text: '- รถยนต์', bold: true }, ': ' + car_drive],
                                        [{ text: '- รถจักรยานยนต์', bold: true }, ': ' + motorcycle_drive],
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }, {
                                text: 'ยานพาหนะที่มี',
                                bold: true
                            }, {
                                table: {
                                    widths: [80, 'auto'],
                                    body: [
                                        [{ text: '- รถยนต์', bold: true }, ': ' + car_owner],
                                        [{ text: '- รถจักรยานยนต์', bold: true }, ': ' + motorcycle_owner],
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }, {
                                margin: [0, 20, 0, 0],
                                text: 'บุคคลที่รู้จักในนี้\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                table: {
                                    widths: [80, 'auto'],
                                    body: [
                                        [{ text: 'ชื่อ - สกุล', bold: true }, ': ' + more_who],
                                        [{ text: 'ตำแหน่ง', bold: true }, ': ' + more_who_position]
                                    ]
                                },
                                layout: tableNoLineAndBorder
                            }
                        ]
                    }
					], columnGap: 15
				},			{
                                margin: [0, 20, 0, 0],
                                text: 'ข้อมูลเพิ่มเติม\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            },{
							 text : [
                                { text: 'ความบกพร่องของร่างกาย หรือโรคติดต่อเรื้อรังที่เป็นอุปสรรคต่อการทำงาน \n' ,bold: true },
								{text:  congenital_disease_status+'\n'},
								{ text: 'เคยเจ็บป่วยหรือได้รับอุบัติเหตุจนต้องเข้ารับการรักษาในโรงพยาบาล \n',bold: true  },
								{text:  hospital_status+'\n'},
								{ text: 'สุขภาพโดยทั่วไป \n',bold: true  },
								{text:  generalhealth+'\n'},
								{ text: 'เคยถูกศาลพิพากษาให้เป็นบุคคลล้มละลาย หรือเคยทำผิดทางอาญา  \n',bold: true },
								{text:  crime_status+'\n'},
								{ text: 'ยินยอมให้บริษัทตรวจประวัติอาชญากรรมหรือไม่\n',bold: true  },
								{text:  crimecheck_status+'\n'},
							{
                                text: 'จุดอ่อนของตนเอง:\n ',
                                bold: true
                            }, {
                                text: more_weakness+'\n'
                            }, {                              
                                text: 'จุดแข็งของตนเอง:\n ',
                                bold: true
                            }, {
                                text:  more_strength+'\n'
                            }, {
                                text: 'สาเหตุที่สมัครงานที่นี่: \n',
                                bold: true
                            }, {
                                text:  more_reason+'\n'
							} ],style:'contentDetail'}
					,{
                // Work History
                width: '50%',
                margin: [0, 20, 0, 0],
                style: ['contentDetail'],
                stack: [
                    {
                        text: 'ประวัติการฝีกอบรม\n',
                        style: 'subHeader',
                    }, {
                         table: {
							headerRows: 1,
                            widths: ['auto', 'auto', 'auto', 'auto'],
                            body: training_data
                               }
                       },
                    { 
						margin: [0, 20, 0, 0],
                        text: 'ประวัติการทำงาน\n',
                        style: 'subHeader',
                    }, {
                        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                        margin: [0, 0, 0, 5]
                    }, {
                        table: {
                            widths: [80, 185, 80, 'auto'],
                            body: work_data_table
                        },
                        layout: tableNoLineAndBorder
                    },
					{
                                text: 'บุคคลที่สามารถติดต่อได้ในกรณีเร่งด่วน\n',
                                style: 'subHeader',
                            }, {
                                canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
                                margin: [0, 0, 0, 5]
                            }, {
                                table: {
                                    widths: [60, 'auto'],
                                    body: [
                                        [{ text: 'ชื่อ', bold: true }, ': ' + namecontact],
                                        [{ text: 'ความสัมพันธ์', bold: true }, ': ' + relationcontact],
										[{ text: 'เบอร์โทรฯ', bold: true }, ': ' + telcontact],
                                        [{ text: 'ที่อยู่', bold: true }, ': ' + addresscontact+'\n\n']
                                    ]
                                },
                                layout: tableNoLineAndBorder
                    }
                ]
            },
 		{
			image: idcard_image,
			width: 500,style: 'logo'
		}, 
		{
			image: consent_base64,
			width: 500,style: 'logo'
		}, 
		{
			image: signimgs,
			   fit: [200, 200],style: 'logo',margin: [0, 10, 0, 0]
		}, 
		
		{ text: fullnamefooter, bold: true,alignment: 'center', margin: [0, -10, 0, 0]}	
        ],

        defaultStyle: {
            font: 'THSarabun'
        },

        styles: {
            logo: {
                alignment: 'center'
            },
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            subHeader: {
                fontSize: 12,
                bold: true,
                alignment: 'left'
            },
            rightText: {
                fontSize: 10,
                alignment: 'right'
            },
            contentDetail: {
                fontSize: 10
            }
        }
    };

    // Create PDF
	
var dathead={
id:generateRandomInteger(10000,99999).toString(),
comp:comp,
today:today,
apply_position:apply_position,
desired_income_amount:desired_income_amount,
desired_income_type:desired_income.substring(0,8).trim(),
work_start:work_start,
prefix:prefix,
firstname:firstname,
lastname:lastname,
nickname:nickname,
eprefix:eprefix,
efirstname:efirstname,
elastname:elastname,
nationalid:nationalid,
weight:weight,
height:height,
birthday:birthday,
age_years:age_years,
age_months:age_months,
nationality:nationality,
race :race ,
religion :religion ,
child :child ,
telephone_number :telephone_number,
email :email,
current_address :current_address,
current_address_street:current_address_street,
current_address_subdistrict:current_address_subdistrict,
current_address_district:current_address_district,
current_address_province:current_address_province,
current_address_zipcode:current_address_zipcode,
current_address_status: current_address_status,
namecontact:namecontact,
relationcontact:relationcontact,
telcontact:telcontact,
addresscontact:addresscontact,
marital_status: marital_status,
military_status:military_status,
crime_status:crime_status,
crimecheck_status:crimecheck_status,
congenital_disease_status:congenital_disease_status,
hospital__status:hospital__status,
generalhealth:generalhealth,
car_drive:car_drive,
car_owner:car_owner,
motorcycle_drive: motorcycle_drive,
motorcycle_owner:motorcycle_owner,
refperson_prefix :refperson_prefix ,
refperson_name :refperson_name ,
refperson_position :refperson_position,
refperson_workstation :refperson_workstation,
refperson_telephone :refperson_telephone,
more_weakness :more_weakness,
more_strength :more_strength,
more_reason :more_reason,
more_who :more_who,
more_who_position :more_who_position,
}


     exportData = {
          head : dathead,
          edu :arr_edu,
          work:arr_workdat,
          lang:arr_langdat,
		  training:arr_trainingdat,
		  image1:profile_image,
		  image2:signimgs,
      image3:idcard_image
        }
		
    const pdfDocGenerator =  pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBase64((data) => {
        // Send mail to Applicants
        //sendEmail('applicants', email, 'hrrecruit@nusasiri.com', apply_position, prefix + firstname + ' ' + lastname, telephone_number, data);

        // Send mail to HR
        //sendEmail('hr', 'hrrecruit@nusasiri.com', email, apply_position, prefix + firstname + ' ' + lastname, telephone_number, data);

        // Config link download and print button
        $('#download_btn').attr('href', 'data:application/pdf;base64,' + data);
		$('#pdfdat').val(data);
   	
	     exportData.pdfdat='data:application/pdf;base64,'+data
		 console.log(exportData)
		 ;
		 
		 postData(exportData,"addApplicant")
		 
		 
		 
	    $('#print_btn').click(function () {
          printJS({ printable: data, type: 'pdf', base64: true });
        })
    })




	
    // Show preview and hide form
    $('#main_form').hide();
    $('#preview_form').show();
    scrollToID('#preview_form');

    // Alert
    Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        html: 'กรุณาพิมพ์ใบสมัคร และรอการติดต่อกลับจากเจ้าหน้าที่',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#8CBA40'
    })
	  
      
	

		return exportData
//			  console.log(exportData)

} //end buildPdf()

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random()*(max - min + 1))
}


async function postData(obj,action) {
	console.log(obj)
//  const response = await fetch("https://script.google.com/macros/s/AKfycbx3Ex1H_aqE7Pwuvgf4w5og3xAf_hf5UlFcLva7br_yTJ7dz-vA8uXsyoO7mdAPc6kt/exec?action="+action, {
    //method: "POST", mode: 'no-cors', // no-cors, *cors, same-origin
    //cache: 'no-cache',
    //body: JSON.stringify(obj),
    //headers: {
		    Swal.fire({
        title: "กำลังส่งข้อมูล...",
        text: "โปรดรอสักครู่",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

		  fetch("https://script.google.com/macros/s/AKfycbz0z-Fhfj93ahIimGor7-L1EpcWSkPHbSfWI6nbDbGOVYWT5dt176h-glfJ5VMHyKspQg/exec?action="+action, {
                method: "POST",
                body: JSON.stringify(obj)
            })
            .then(response => response.json())
            .then(data => {
            Swal.fire({
            title: "สำเร็จ!",
            text: "บันทึกข้อมูลเรียบร้อย",
            icon: "success",
            confirmButtonText: "ตกลง"
        });
				//var sendvar={position:val.apply_position,urlpdf:urlapplpdf,urlimage:urlprofileimage,token:notifytoken}
				//console.log(data)
			})
	}
