// ============================================
// INITIALIZATION & CONFIGURATION
// ============================================

let exportData = {};
var cplogo = "";

$(document).ready(function() {
  initializeApp();
});

function initializeApp() {
  const params = getmyparm(location.search);
  initializeSignaturePad();
  initializeDatePickers();
  initializeFormValidation();
  attachEventListeners();
}

// ============================================
// PARAMETER PARSING
// ============================================

function getmyparm(search_string) {
  const parse = function(params, pairs) {
    const pair = pairs[0];
    const parts = pair.split('=');
    const key = decodeURIComponent(parts[0]);
    const value = decodeURIComponent(parts.slice(1).join('='));

    if (typeof params[key] === "undefined") {
      params[key] = value;
    } else {
      params[key] = [].concat(params[key], value);
    }

    return pairs.length == 1 ? params : parse(params, pairs.slice(1));
  };

  const q = search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
  const companyCode = typeof q.cp === "undefined" ? 'IPR' : q.cp;
  
  const cplogo = "https://pggitdev.github.io/ppg-files/asset/primelogo.png";
  
  $('#comp').val(companyCode);
  loadImages(cplogo);
  
  return q;
}

function loadImages(logoUrl) {
  $('#hlogo').attr('src', '').promise().done(function() {
    $(this).attr('src', logoUrl);
    convert_imageURL_to_Base64(logoUrl, (imageBase64) => {
      $('#logo_base64').val(imageBase64);
    });
    convert_imageURL_to_Base64("https://pggitdev.github.io/ppg-files/asset/ppgconsent.jpg", (imageBase64) => {
      $('#consent_base64').val(imageBase64);
    });
  });
}

// ============================================
// SIGNATURE PAD INITIALIZATION
// ============================================

function initializeSignaturePad() {
  $('#bt_submit').prop("disabled", true);
  
  const wrapper1 = document.getElementById("signature-pad-1");
  const canvas1 = wrapper1.querySelector("canvas");
  
  resizeCanvas(canvas1);
  
  const signaturePad1 = new SignaturePad(canvas1, {
    backgroundColor: 'rgb(255,255,255)',
    penColor: "rgb(66, 133, 244)",
    onBegin: function() {},
    onEnd: function() {
      const data = signaturePad1.toDataURL('image/png');
      $('#SignupImage1').val(data);
      $("#signimgs").attr("src", data);
    }
  });

  $("#btnRest").click(function() {
    signaturePad1.clear();
  });

  window.signaturePad1 = signaturePad1;
}

function resizeCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
}

// ============================================
// IMAGE PROCESSING
// ============================================

function readFile(input, previewId, el_base64) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = async function() {
        const resizedImage = await resizeImage(img, 800, 800, 0.7);
        $(previewId).css('background-image', 'url(' + resizedImage + ')');
        $(previewId).hide().fadeIn(650);
        $(el_base64).val(resizedImage);
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

function convert_imageURL_to_Base64(url, callback, outputFormat) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    const dataURL = canvas.toDataURL(outputFormat || 'image/png');
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

// ============================================
// INPUT VALIDATION
// ============================================

function inputNumbers(e) {
  const keynum = window.event ? e.keyCode : e.which;
  
  if (keynum == 13 || keynum == 8 || typeof(keynum) == "undefined") {
    return true;
  }
  
  const keychar = String.fromCharCode(keynum);
  const numcheck = /^[0-9.]$/;
  return numcheck.test(keychar);
}

function validateIDLength(input) {
  if (input.value.length !== 13) {
    alert("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
    input.focus();
  }
}

// ============================================
// DATE & TIME UTILITIES
// ============================================

const months = 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_');
const shortMonths = 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_');
const days = 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุ���ร์_เสาร์'.split('_');
const shortDays = 'อา_จ_อ_พ_พฤ_ศ_ส'.split('_');

const th = new duDatepicker.i18n.Locale(months, shortMonths, days, shortDays, shortDays, 1);

function initializeDatePickers() {
  duDatepicker('#work_start', {
    format: 'dd/mm/yyyy',
    theme: 'green',
    auto: true,
    i18n: th
  });

  duDatepicker('#birthday', {
    format: 'dd/mm/yyyy',
    minDate: '1900-01-01',
    maxDate: new Date(),
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
}

function changetobe(dateElement) {
  const date = $(dateElement).val().split("/");
  const yearbe = parseInt(date[2]) + 543;
  $(dateElement).val(date[0] + '/' + date[1] + "/" + yearbe);
}

// ============================================
// AGE CALCULATION
// ============================================

function calculateAge(birthdayElement) {
  const dayBirth = $(birthdayElement).val();
  const [DB, MB, YB] = dayBirth.split("/");

  const setdayBirth = moment(YB + "-" + MB + "-" + DB);
  const setNowDate = moment();
  const yearData = setNowDate.diff(setdayBirth, 'years', true);
  const yearReal = setNowDate.diff(setdayBirth, 'years');
  const monthDiff = Math.floor((yearData - yearReal) * 12);

  $('#age_years').val(parseInt(yearReal) + 542);
  $('#age_months').val(parseInt(monthDiff) + 12);
}

// ============================================
// WORK EXPERIENCE CALCULATION
// ============================================

function calculateWorkExperience(fromElement, toElement, yearsOutput, monthsOutput) {
  const from = $(fromElement).val();
  let to = $(toElement).val();

  if (to === "ปัจจุบัน") {
    to = moment().add(543, 'year').format("DD/MM/YYYY");
  }

  if (to) {
    const [FD, FM, FY] = from.split("/");
    const [TD, TM, TY] = to.split("/");

    const setfromday = moment(FY + "-" + FM + "-" + FD);
    const settoday = moment(TY + "-" + TM + "-" + TD);
    const yearfrom = settoday.diff(setfromday, 'years', true);
    const year_work = settoday.diff(setfromday, 'years');
    const month_work = Math.floor((yearfrom - year_work) * 12);

    $(yearsOutput).val(parseInt(year_work));
    $(monthsOutput).val(parseInt(month_work));
  } else {
    $(yearsOutput).val("");
    $(monthsOutput).val("");
  }
}

function work_date_from_change(work_from) {
  const work_rank = getWorkRank(work_from.id);
  const toElement = `#work_date_to${work_rank}`;
  const yearsOutput = `#work_years${work_rank}`;
  const monthsOutput = `#work_months${work_rank}`;

  calculateWorkExperience(work_from, toElement, yearsOutput, monthsOutput);
}

function work_date_to_change(work_to) {
  const work_rank = getWorkRank(work_to.id);
  const fromElement = `#work_date_from${work_rank}`;
  const yearsOutput = `#work_years${work_rank}`;
  const monthsOutput = `#work_months${work_rank}`;

  calculateWorkExperience(fromElement, work_to, yearsOutput, monthsOutput);
}

function worktoday(work_rank) {
  work_rank = work_rank ? "_" + work_rank : "";
  const to = moment().add(543, 'year').format("DD/MM/YYYY");
  const toElement = `#work_date_to${work_rank}`;
  const fromElement = `#work_date_from${work_rank}`;
  const btnElement = `#btn_today${work_rank}`;

  $(toElement).val(to);

  const isDisabled = $(toElement).prop('disabled');
  $(toElement).prop('disabled', !isDisabled);
  $(btnElement).toggleClass('is-dark');

  const yearsOutput = `#work_years${work_rank}`;
  const monthsOutput = `#work_months${work_rank}`;

  calculateWorkExperience(fromElement, toElement, yearsOutput, monthsOutput);
}

function getWorkRank(elementId) {
  const parts = elementId.split("_");
  return parts[3] ? "_" + parts[3] : "";
}

// ============================================
// ADDRESS AUTOCOMPLETE
// ============================================

function initializeAddressAutocomplete() {
  $.Thailand({
    $district: $('#current_address_subdistrict'),
    $amphoe: $('#current_address_district'),
    $province: $('#current_address_province'),
    $zipcode: $('#current_address_zipcode'),
  });
}

// ============================================
// DYNAMIC FORM SECTIONS
// ============================================

// Image upload handlers
$('#profile_image').change(function() {
  readFile(this, '#profile_image_preview', '#profile_image_base64');
});

$('#idcard_image').change(function() {
  readFile(this, '#idcard_image_preview', '#idcard_image_base64');
});

// Consent checkbox handlers
$('#consent').change(updateSubmitButtonState);
$('#consent2').change(updateSubmitButtonState);

function updateSubmitButtonState() {
  const isConsented = $('#consent').is(":checked") && $('#consent2').is(":checked");
  $('#bt_submit').prop('disabled', !isConsented);
}

// ============================================
// DYNAMIC FIELD VISIBILITY
// ============================================

$('input:radio[name="desired_income"]').change(function() {
  $('#desired_income_amount_display').toggle(
    $(this).val() === 'daily' || $(this).val() === 'monthly'
  );
});

$('#name_prefix').change(function() {
  $('#military_display').toggle($(this).val() === 'นาย');
});

$('#birthday').change(function() {
  calculateAge(this);
});

$('input:radio[name="crime_status"]').change(function() {
  $('#crime_case_display').toggle($(this).val() === 'ever');
  if ($(this).val() === 'ever') {
    window.signaturePad1?.clear();
  }
});

$('input:radio[name="congenital_disease_status"]').change(function() {
  $('#congenital_disease_display').toggle($(this).val() === 'have');
});

$('input:radio[name="hospital_status"]').change(function() {
  $('#hospital_detail_display').toggle($(this).val() === 'have');
});

$('input:radio[name="car_owner"]').change(function() {
  $('#car_registration_number_display').toggle($(this).val() === 'have');
});

$('input:radio[name="motorcycle_owner"]').change(function() {
  $('#motorcycle_registration_number_display').toggle($(this).val() === 'have');
});

// ============================================
// DYNAMIC TABLE ROWS (Languages)
// ============================================

$('#language_add').click(function() {
  const newRow = `
    <tr>
      <td><div class="field"><input type="text" class="input" name="language[]" maxlength="100" placeholder="ระบุภาษา"></div></td>
      <td><div class="select is-fullwidth"><select name="lang_listen[]"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>
      <td><div class="select is-fullwidth"><select name="lang_speak[]"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>
      <td><div class="select is-fullwidth"><select name="lang_read[]"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>
      <td><div class="select is-fullwidth"><select name="lang_write[]"><option value="">-- เลือก --</option><option value="fair">พอใช้</option><option value="good">ดี</option><option value="verygood">ดีมาก</option></select></div></td>
    </tr>
  `;
  $("#language_tr").append(newRow);
});

// ============================================
// DYNAMIC FORM SECTIONS (Education)
// ============================================

let edu_rank = 1;
$('#edu_add').click(function() {
  if (!validateEducationForm()) return;
  edu_rank++;
  const eduHtml = buildEducationSection(edu_rank);
  $("#edu_display").append(eduHtml);
});

function buildEducationSection(rank) {
  return `
    <div id="edu_display_${rank}">
      <hr class="navbar-divider mb-5">
      <h5 class="title is-5">ลำดับที่ ${rank}
        <button type="button" class="button is-danger is-outlined is-rounded is-small" onclick="removeEducation(${rank})">ลบ</button>
      </h5>
      <!-- Education form fields here -->
    </div>
  `;
}

function removeEducation(rank) {
  $(`#edu_display_${rank}`).remove();
  edu_rank = rank - 1;
}

function validateEducationForm() {
  return $('#edu_name').val().length > 0;
}

function edu_level_bg(value, ref) {
  const isBachelor = ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'].includes(value);
  $(`#edu_bg_display_${ref}`).toggle(isBachelor);
}

// ============================================
// DYNAMIC FORM SECTIONS (Work)
// ============================================

let work_rank = 1;
$('#work_add').click(function() {
  work_rank++;
  const workHtml = buildWorkSection(work_rank);
  $("#work_display").append(workHtml);
  
  initializeWorkDatePickers(work_rank);
});

function buildWorkSection(rank) {
  return `
    <div id="work_display_${rank}">
      <hr class="navbar-divider mb-5">
      <h5 class="title is-5">ลำดับที่ ${rank}
        <button type="button" class="button is-danger is-outlined is-rounded is-small" onclick="removeWork(${rank})">ลบ</button>
      </h5>
      <!-- Work form fields here -->
    </div>
  `;
}

function removeWork(rank) {
  $(`#work_display_${rank}`).remove();
  work_rank = rank - 1;
}

function initializeWorkDatePickers(rank) {
  duDatepicker(`#work_date_from_${rank}`, {
    format: 'dd/mm/yyyy',
    theme: 'green',
    auto: true,
    i18n: th
  });
  duDatepicker(`#work_date_to_${rank}`, {
    format: 'dd/mm/yyyy',
    theme: 'green',
    auto: true,
    i18n: th
  });
}

// ============================================
// TRAINING SECTION
// ============================================

let training_rank = 1;
$('#training_add').click(function() {
  if ($('#training_name').val().length === 0) return;
  training_rank++;
  const trainingRow = `
    <tr>
      <td><div class="field"><input type="text" class="input" name="training_name[]" maxlength="100" placeholder="ระบุชื่อหลักสูตร"></div></td>
      <td><div class="field"><input type="text" class="input" name="training_insitname[]" maxlength="100" placeholder="ระบุสถาบัน"></div></td>
      <td><div class="field"><input type="text" class="input" name="training_degree[]" maxlength="100" placeholder="ระบุวุฒิที่ได้รับ"></div></td>
      <td><div class="field"><input type="text" class="input" name="training_period[]" maxlength="100" placeholder="ระบุระยะเวลา"></div></td>
    </tr>
  `;
  $("#training_tr").append(trainingRow);
});

// ============================================
// FORM VALIDATION
// ============================================

function initializeFormValidation() {
  const validationRules = {
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
    ename_prefix: 'required',
    efirstname: 'required',
    elastname: 'required',
    nationalid: {
      required: true,
      minlength: 13,
      maxlength: 13,
      digits: true
    },
    // ... (rest of validation rules)
  };

  const validationMessages = {
    profile_image: 'กรุณาเลือกไฟล์ภาพถ่าย',
    // ... (rest of validation messages)
  };

  $('#registration_frm').validate({
    rules: validationRules,
    messages: validationMessages,
    wrapper: 'span',
    onfocusout: function(element) {
      $(element).valid();
    },
    errorPlacement: function(error, element) {
      error.addClass('has-text-danger help');
      const errorMap = {
        'desired_income': '#desired_income_error',
        'current_address_status': '#current_address_status_error',
        'marital_status': '#marital_error',
        'military_status': '#military_error',
        'crime_status': '#crime_error',
        'crimecheck_status': '#crimecheck_error',
        'congenital_disease_status': '#congenital_disease_error',
        'hospital_status': '#hospital_status_error',
        'car_drive': '#car_drive_error',
        'motorcycle_drive': '#motorcycle_drive_error',
        'car_owner': '#car_owner_error',
        'motorcycle_owner': '#motorcycle_owner_error',
      };

      const fieldName = element.prop('name');
      const errorContainer = errorMap[fieldName];
      
      if (errorContainer) {
        error.appendTo(errorContainer);
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function(form) {
      showSubmitConfirmation();
    }
  });
}

function showSubmitConfirmation() {
  Swal.fire({
    icon: 'question',
    title: 'ยืนยันข้อมูล?',
    html: 'เมื่อยืนยันข้อมูลแล้ว จะไม่สามารถแก้ไขข้อมูลได้ <br/>คุณแน่ใจหรือ',
    confirmButtonText: 'ยืนยันข้อมูล',
    confirmButtonColor: '#8CBA40',
    showCancelButton: true,
    cancelButtonText: 'แก้ไขข้อมูล'
  }).then((result) => {
    if (result.isConfirmed) {
      build_pdf();
    }
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function scrollToID(id) {
  $('html, body').animate({
    scrollTop: $(id).offset().top
  }, 2000);
}

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function attachEventListeners() {
  initializeAddressAutocomplete();
  // Add other event listeners here
}

// ============================================
// PDF GENERATION (Build PDF)
// ============================================

function build_pdf() {
  const pdfData = collectFormData();
  const docDefinition = buildPdfDocument(pdfData);
  
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getBase64((data) => {
    exportData = {
      head: pdfData.head,
      edu: pdfData.edu,
      work: pdfData.work,
      lang: pdfData.lang,
      training: pdfData.training,
      image1: pdfData.profileImage,
      image2: pdfData.signatureImage,
      image3: pdfData.idcardImage,
      pdfdat: 'data:application/pdf;base64,' + data
    };

    $('#download_btn').attr('href', 'data:application/pdf;base64,' + data);
    $('#pdfdat').val(data);

    $('#print_btn').click(function() {
      printJS({ printable: data, type: 'pdf', base64: true });
    });

    $('#main_form').hide();
    $('#preview_form').show();
    scrollToID('#preview_form');

    showSuccessAlert();
    postData(exportData, "addApplicant");
  });
}

function collectFormData() {
  // Collect all form data here
  return {
    head: {},
    edu: [],
    work: [],
    lang: [],
    training: [],
    profileImage: $('#profile_image_base64').val(),
    signatureImage: $('#SignupImage1').val(),
    idcardImage: $('#idcard_image_base64').val()
  };
}

function buildPdfDocument(pdfData) {
  // Build PDF document structure
  return {
    pageSize: 'A4',
    content: [],
    defaultStyle: {
      font: 'THSarabun'
    }
  };
}

function showSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'สำเร็จ',
    html: 'กรุณาพิมพ์ใบสมัคร และรอการติดต่อกลับจากเจ้าหน้าที่',
    confirmButtonText: 'ตกลง',
    confirmButtonColor: '#8CBA40'
  });
}

// ============================================
// DATA SUBMISSION
// ============================================

async function postData(obj, action) {
  Swal.fire({
    title: "กำลังส่งข้อมูล...",
    text: "โปรดรอสักครู่",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbz0z-Fhfj93ahIimGor7-L1EpcWSkPHbSfWI6nbDbGOVYWT5dt176h-glfJ5VMHyKspQg/exec?action=${action}`,
      {
        method: "POST",
        body: JSON.stringify(obj)
      }
    );

    const data = await response.json();
    
    Swal.fire({
      title: "สำเร็จ!",
      text: "บันทึกข้อมูลเรียบร้อย",
      icon: "success",
      confirmButtonText: "ตกลง"
    });
  } catch (error) {
    Swal.fire({
      title: "ผิดพลาด",
      text: "เกิดข้อผิดพลาดในการส่งข้อมูล",
      icon: "error",
      confirmButtonText: "ตกลง"
    });
    console.error('Error:', error);
  }
}
