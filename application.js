/**
 * Main Application Logic
 * Handles form initialization, validation, and event listeners
 */

let exportData = {};
var cplogo = "";

$(document).ready(function() {
    initializeApp();
});

/**
 * Initialize Application
 */
function initializeApp() {
    const params = getmyparm(location.search);
    initializeSignaturePad();
    initializeDatePickers();
    initializeFormValidation();
    attachEventListeners();
}

/**
 * Parse URL Parameters
 */
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

/**
 * Load Images
 */
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

/**
 * Initialize Signature Pad
 */
function initializeSignaturePad() {
    $('#bt_submit').prop("disabled", true);
    
    const wrapper1 = document.getElementById("signature-pad-1");
    const canvas1 = wrapper1.querySelector("canvas");
    
    resizeCanvas(canvas1);
    
    const signaturePad1 = new SignaturePad(canvas1, {
        backgroundColor: 'rgb(255,255,255)',
        penColor: "rgb(66, 133, 244)",
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

/**
 * Convert Image URL to Base64
 */
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
    };
    img.src = url;
}

/**
 * Input Numbers Only
 */
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

/**
 * Initialize Date Pickers
 */
const months = 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_');
const shortMonths = 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_');
const days = 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_');
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

/**
 * Form Validation Rules
 */
function initializeFormValidation() {
    $('#registration_frm').validate({
        rules: {
            profile_image: 'required',
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
            marital_status: 'required',
            military_status: 'required',
            car_drive: 'required',
            motorcycle_drive: 'required',
            car_owner: 'required',
            motorcycle_owner: 'required',
            'edu_level[]': 'required',
            'edu_name[]': 'required',
            'edu_year[]': 'required',
            'edu_branch[]': 'required',
            'edu_gpa[]': 'required'
        },
        messages: {
            profile_image: 'กรุณาเลือกไฟล์ภาพถ่าย',
            apply_position: 'กรุณาระบุตำแหน่งงาน',
            desired_income: 'กรุณาระบุรายได้ที่ต้องการ',
            desired_income_amount: 'กรุณาระบุรายได้ที่ต้องการ',
            work_start: 'กรุณาระบุ���ันที่เริ่มทำงาน',
            name_prefix: 'กรุณาเลือกคำนำหน้า',
            firstname: 'กรุณาระบุชื่อ',
            lastname: 'กรุณาระบุนามสกุล',
            nickname: 'กรุณาระบุชื่อเล่น',
            ename_prefix: 'กรุณาเลือกคำนำหน้า-Eng',
            efirstname: 'กรุณาระบุชื่อ-Eng',
            elastname: 'กรุณาระบุนามสกุล-Eng',
            nationalid: 'กรุณาระบุเลขบัตรประชาชน (13 หลัก)',
            weight: 'กรุณาระบุน้ำหนัก',
            height: 'กรุณาระบุส่วนสูง',
            birthday: 'กรุณาระบุวัน/เดือน/ปี เกิด',
            nationality: 'กรุณาระบุสัญชาติ',
            race: 'กรุณาระบุเชื้อชาติ',
            religion: 'กรุณาระบุศาสนา',
            telephone_number: 'กรุณาระบุเบอร์โทรศัพท์',
            email: 'กรุณาระบุอีเมล',
            current_address: 'กรุณาระบุที่อยู่ปัจจุบัน',
            current_address_street: 'กรุณาระบุถนน',
            current_address_subdistrict: 'กรุณาระบุแขวง/ตำบล',
            current_address_district: 'กรุณาระบุเขต/อำเภอ',
            current_address_province: 'กรุณาระบุจังหวัด',
            current_address_zipcode: 'กรุณาระบุรหัสไปรษณีย์',
            current_address_status: 'กรุณาระบุสถานะที่อยู่',
            marital_status: 'กรุณาระบุสถานภาพการสมรส',
            military_status: 'กรุณาระบุสถานภาพการทหาร',
            car_drive: 'กรุณาระบุความสามารถขับรถยนต์',
            motorcycle_drive: 'กรุณาระบุความสามารถขับจักรยานยนต์',
            car_owner: 'กรุณาระบุการเป็นเจ้าของรถยนต์',
            motorcycle_owner: 'กรุณาระบุการเป็นเจ้าของจักรยานยนต์'
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
        html: 'เมื่อยืนยันข้อมูลแล้ว จะไม่สามารถแก้ไขได้<br/>คุณแน่ใจหรือ?',
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

/**
 * Attach Event Listeners
 */
function attachEventListeners() {
    // Profile image upload
    $('#profile_image').change(function() {
        readFile(this, '#profile_image_preview', '#profile_image_base64');
    });

    // ID card image upload
    $('#idcard_image').change(function() {
        readFile(this, '#idcard_image_preview', '#idcard_image_base64');
    });

    // Consent checkboxes
    $('#consent').change(updateSubmitButtonState);
    $('#consent2').change(updateSubmitButtonState);

    // Desired income radio
    $('input:radio[name="desired_income"]').change(function() {
        $('#desired_income_amount_display').toggle(
            $(this).val() === 'daily' || $(this).val() === 'monthly'
        );
    });

    // Name prefix (show military for males)
    $('#name_prefix').change(function() {
        $('#military_display').toggle($(this).val() === 'นาย');
    });

    // Birthday calculation
    $('#birthday').change(function() {
        calculateAge(this);
    });

    // Vehicle owner display
    $('input:radio[name="car_owner"]').change(function() {
        $('#car_registration_number_display').toggle($(this).val() === 'have');
    });

    $('input:radio[name="motorcycle_owner"]').change(function() {
        $('#motorcycle_registration_number_display').toggle($(this).val() === 'have');
    });
}

function updateSubmitButtonState() {
    const isConsented = $('#consent').is(":checked") && $('#consent2').is(":checked");
    $('#bt_submit').prop('disabled', !isConsented);
}

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

function changetobe(dateElement) {
    const date = $(dateElement).val().split("/");
    const yearbe = parseInt(date[2]) + 543;
    $(dateElement).val(date[0] + '/' + date[1] + "/" + yearbe);
}

/**
 * Scroll to Element
 */
function scrollToID(id) {
    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 2000);
}

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}
