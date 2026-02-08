// ============================================
// PDF GENERATION MODULE
// ============================================

/**
 * Main PDF generation function
 * Collects form data, builds PDF document, and handles export
 */
function build_pdf() {
  try {
    // Step 1: Collect all form data
    const pdfData = collectFormData();
    
    // Step 2: Display preview data
    displayPreviewData(pdfData);
    
    // Step 3: Build PDF document structure
    const docDefinition = buildPdfDocument(pdfData);
    
    // Step 4: Generate PDF and handle base64 conversion
    generateAndExportPdf(docDefinition, pdfData);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    showErrorAlert('ผิดพลาดในการสร้าง PDF');
  }
}

// ============================================
// DATA COLLECTION FUNCTIONS
// ============================================

/**
 * Collect all form data needed for PDF generation
 */
function collectFormData() {
  const headerData = collectHeaderData();
  const profileData = collectProfileData();
  const addressData = collectAddressData();
  const educationData = collectEducationData();
  const workData = collectWorkData();
  const languageData = collectLanguageData();
  const trainingData = collectTrainingData();
  const vehicleData = collectVehicleData();
  const healthData = collectHealthData();
  const additionalData = collectAdditionalData();
  const referenceData = collectReferenceData();
  const imageData = collectImageData();

  return {
    head: headerData,
    profile: profileData,
    address: addressData,
    edu: educationData,
    work: workData,
    lang: languageData,
    training: trainingData,
    vehicle: vehicleData,
    health: healthData,
    additional: additionalData,
    reference: referenceData,
    images: imageData
  };
}

function collectHeaderData() {
  return {
    id: generateRandomInteger(10000, 99999).toString(),
    company: $('#comp').val(),
    today: moment().add(543, 'year').format("DD/MM/YYYY"),
    applyPosition: $('#apply_position').val(),
    desiredIncomeType: $('input[name="desired_income"]:checked').val(),
    desiredIncomeAmount: $('#desired_income_amount').val(),
    workStart: $('#work_start').val()
  };
}

function collectProfileData() {
  return {
    prefix: $('#name_prefix').val(),
    firstName: $('#firstname').val(),
    lastName: $('#lastname').val(),
    nickname: $('#nickname').val(),
    ePrefix: $('#ename_prefix').val(),
    eFirstName: $('#efirstname').val(),
    eLastName: $('#elastname').val(),
    nationalId: $('#nationalid').val(),
    weight: $('#weight').val(),
    height: $('#height').val(),
    birthday: $('#birthday').val(),
    ageYears: $('#age_years').val(),
    ageMonths: $('#age_months').val(),
    nationality: $('#nationality').val(),
    race: $('#race').val(),
    religion: $('#religion').val(),
    telephone: $('#telephone_number').val(),
    email: $('#email').val(),
    maritalStatus: getMaritalStatus(),
    childCount: $('#child').val(),
    militaryStatus: getMilitaryStatus()
  };
}

function collectAddressData() {
  return {
    current: $('#current_address').val(),
    street: $('#current_address_street').val(),
    subDistrict: $('#current_address_subdistrict').val(),
    district: $('#current_address_district').val(),
    province: $('#current_address_province').val(),
    zipCode: $('#current_address_zipcode').val(),
    status: getAddressStatus(),
    emergency: {
      name: $('#namecontact').val(),
      relation: $('#relationcontact').val(),
      telephone: $('#telcontact').val(),
      address: $('#addresscontact').val()
    }
  };
}

function collectEducationData() {
  const eduNames = $("input[name='edu_name[]']").map(function() { return $(this).val(); }).get();
  const eduLevels = $("select[name='edu_level[]']").map(function() { return $(this).val(); }).get();
  const eduBgs = $("input[name='edu_bg[]']").map(function() { return $(this).val(); }).get();
  const eduBranches = $("input[name='edu_branch[]']").map(function() { return $(this).val(); }).get();
  const eduGpas = $("input[name='edu_gpa[]']").map(function() { return $(this).val(); }).get();
  const eduYears = $("input[name='edu_year[]']").map(function() { return $(this).val(); }).get();

  const education = [];
  for (let i = 0; i < eduNames.length; i++) {
    education.push({
      name: eduNames[i],
      level: eduLevels[i],
      faculty: eduBgs[i] || '-',
      branch: eduBranches[i],
      gpa: eduYears[i] === '0' ? '-' : eduGpas[i],
      year: eduYears[i] === '0' ? 'กำลังศึกษา' : `พ.ศ.${eduYears[i]}`,
      yearValue: eduYears[i]
    });
  }

  return education;
}

function collectWorkData() {
  const workDatesFrom = $("input[name='work_date_from[]']").map(function() { return $(this).val(); }).get();
  const workDatesTo = $("input[name='work_date_to[]']").map(function() { return $(this).val(); }).get();
  const workYears = $("input[name='work_years[]']").map(function() { return $(this).val(); }).get();
  const workMonths = $("input[name='work_months[]']").map(function() { return $(this).val(); }).get();
  const workStations = $("input[name='work_station[]']").map(function() { return $(this).val(); }).get();
  const workPositions = $("input[name='work_position[]']").map(function() { return $(this).val(); }).get();
  const workSalaries = $("input[name='work_salary[]']").map(function() { return $(this).val(); }).get();
  const workTelephones = $("input[name='work_telephone[]']").map(function() { return $(this).val(); }).get();
  const workResponsibilities = $("textarea[name='work_responsibility[]']").map(function() { return $(this).val(); }).get();
  const workReasons = $("textarea[name='work_reason[]']").map(function() { return $(this).val(); }).get();

  const work = [];
  for (let i = 0; i < workStations.length; i++) {
    work.push({
      period: `${workDatesFrom[i]} - ${workDatesTo[i]}`,
      years: workYears[i],
      months: workMonths[i],
      station: workStations[i],
      position: workPositions[i],
      salary: workSalaries[i],
      telephone: workTelephones[i],
      responsibility: workResponsibilities[i],
      reason: workReasons[i]
    });
  }

  return work;
}

function collectLanguageData() {
  const languageNames = $("input[name='language[]']").map(function() { return $(this).val(); }).get();
  const langListens = $("select[name='lang_listen[]']").map(function() { return $(this).val(); }).get();
  const langSpeaks = $("select[name='lang_speak[]']").map(function() { return $(this).val(); }).get();
  const langReads = $("select[name='lang_read[]']").map(function() { return $(this).val(); }).get();
  const langWrites = $("select[name='lang_write[]']").map(function() { return $(this).val(); }).get();

  const languages = [];
  for (let i = 0; i < languageNames.length; i++) {
    languages.push({
      name: languageNames[i],
      listen: convertLanguageLevel(langListens[i]),
      speak: convertLanguageLevel(langSpeaks[i]),
      read: convertLanguageLevel(langReads[i]),
      write: convertLanguageLevel(langWrites[i])
    });
  }

  return languages;
}

function collectTrainingData() {
  const trainingNames = $("input[name='training_name[]']").map(function() { return $(this).val(); }).get();
  const trainingInstitutes = $("input[name='training_insitname[]']").map(function() { return $(this).val(); }).get();
  const trainingDegrees = $("input[name='training_degree[]']").map(function() { return $(this).val(); }).get();
  const trainingPeriods = $("input[name='training_period[]']").map(function() { return $(this).val(); }).get();

  const training = [];
  for (let i = 0; i < trainingNames.length; i++) {
    if (trainingNames[i].length === 0) continue;
    training.push({
      name: trainingNames[i],
      institute: trainingInstitutes[i],
      degree: trainingDegrees[i],
      period: trainingPeriods[i]
    });
  }

  return training;
}

function collectVehicleData() {
  return {
    carDrive: getCarDriveStatus(),
    carOwn: getCarOwnStatus(),
    carRegNo: $('#car_registration_number').val() || '-',
    motorcycleDrive: getMotorcycleDriveStatus(),
    motorcycleOwn: getMotorcycleOwnStatus(),
    motorcycleRegNo: $('#motorcycle_registration_number').val() || '-'
  };
}

function collectHealthData() {
  return {
    generalHealth: $('#generalhealth').val(),
    congenitalDisease: getCongenitalDiseaseStatus(),
    hospital: getHospitalStatus(),
    crime: getCrimeStatus(),
    crimeCheck: getCrimeCheckStatus()
  };
}

function collectAdditionalData() {
  return {
    weakness: $('#more_weakness').val(),
    strength: $('#more_strength').val(),
    reason: $('#more_reason').val(),
    knownPerson: $('#more_who').val(),
    knownPersonPosition: $('#more_who_position').val()
  };
}

function collectReferenceData() {
  return {
    prefix: $('#refperson_prefix').val(),
    name: $('#refperson_name').val(),
    position: $('#refperson_position').val(),
    workStation: $('#refperson_workstation').val(),
    telephone: $('#refperson_telephone').val()
  };
}

function collectImageData() {
  return {
    logo: $('#logo_base64').val(),
    profile: $('#profile_image_base64').val(),
    signature: $('#SignupImage1').val(),
    idCard: $('#idcard_image_base64').val(),
    consent: $('#consent_base64').val()
  };
}

// ============================================
// CONVERSION & HELPER FUNCTIONS
// ============================================

function convertLanguageLevel(value) {
  const levels = {
    'fair': 'พอใช้',
    'good': 'ดี',
    'verygood': 'ดีมาก'
  };
  return levels[value] || '-';
}

function getMaritalStatus() {
  const status = $('input[name="marital_status"]:checked').val();
  const statuses = {
    'single': 'โสด',
    'marry': 'สมรส',
    'divorce': 'หย่า',
    'unregister': 'ไม่จดทะเบียน'
  };
  return statuses[status] || '-';
}

function getMilitaryStatus() {
  const status = $('input[name="military_status"]:checked').val();
  const statuses = {
    'passed': 'ผ่านการคัดเลือกทหารแล้ว',
    'notpassed': 'ยังไม่ผ่านการคัดเลือกทหาร',
    'exempt': 'ได้รับการยกเว้น'
  };
  return statuses[status] || '';
}

function getAddressStatus() {
  const status = $('input[name="current_address_status"]:checked').val();
  const statuses = {
    'self_house': 'บ้านตนเอง',
    'rent_house': 'บ้านเช่า',
    'other': 'อื่น ๆ'
  };
  return statuses[status] || '-';
}

function getCarDriveStatus() {
  const status = $('input[name="car_drive"]:checked').val();
  return status === 'can' ? 'ขับได้' : 'ขับไม่ได้';
}

function getCarOwnStatus() {
  return $('input[name="car_owner"]:checked').val() === 'have' ? 'มี' : 'ไม่มี';
}

function getMotorcycleDriveStatus() {
  const status = $('input[name="motorcycle_drive"]:checked').val();
  return status === 'can' ? 'ขับได้' : 'ขับไม่ได้';
}

function getMotorcycleOwnStatus() {
  return $('input[name="motorcycle_owner"]:checked').val() === 'have' ? 'มี' : 'ไม่มี';
}

function getCongenitalDiseaseStatus() {
  const status = $('input[name="congenital_disease_status"]:checked').val();
  if (status === 'have') {
    return 'มี: ' + $('#congenital_disease').val();
  }
  return status === 'not_have' ? 'ไม่มี' : '-';
}

function getHospitalStatus() {
  const status = $('input[name="hospital_status"]:checked').val();
  if (status === 'have') {
    return 'มี: ' + $('#hospital_detail').val();
  }
  return status === 'not_have' ? 'ไม่มี' : '-';
}

function getCrimeStatus() {
  const status = $('input[name="crime_status"]:checked').val();
  if (status === 'ever') {
    return 'เคยต้องโทษ: ' + $('#crime_case').val();
  }
  return status === 'never' ? 'ไม่เคยต้อง���ทษ' : '-';
}

function getCrimeCheckStatus() {
  const status = $('input[name="crimecheck_status"]:checked').val();
  return status === 'yes' ? 'ยินยอม' : 'ไม่ยินยอม';
}

function getFullnameFooter() {
  return `( ${$('#name_prefix').val()}${$('#firstname').val()} ${$('#lastname').val()} )`;
}

function getDesiredIncomeText() {
  const type = $('input[name="desired_income"]:checked').val();
  const amount = $('#desired_income_amount').val();
  if (type === 'daily') return `รายวัน ${amount} บาท`;
  if (type === 'monthly') return `รายเดือน ${amount} บาท`;
  return '-';
}

// ============================================
// PREVIEW DATA DISPLAY
// ============================================

/**
 * Update preview section with collected data
 */
function displayPreviewData(pdfData) {
  // Header info
  $('#preview_date_now').text(pdfData.head.today);
  $('#preview_apply_position').text(pdfData.head.applyPosition);
  $('#preview_desired_income').text(getDesiredIncomeText());
  $('#preview_work_start').text(pdfData.head.workStart);

  // Profile
  const profile = pdfData.profile;
  $('#preview_profile_image').attr('src', pdfData.images.profile);
  $('#preview_idcard_image').attr('src', pdfData.images.idCard);
  $('#preview_fullname').text(`${profile.prefix}${profile.firstName} ${profile.lastName} (${profile.nickname})`);
  $('#preview_efullname').text(`${profile.ePrefix}${profile.eFirstName} ${profile.eLastName}`);
  $('#preview_weight').text(`${profile.weight} กก.`);
  $('#preview_height').text(`${profile.height} ซม.`);
  $('#preview_birthday').text(`${profile.birthday} (${profile.ageYears} ปี ${profile.ageMonths} เดือน)`);
  $('#preview_nationality').text(profile.nationality);
  $('#preview_race').text(profile.race);
  $('#preview_religion').text(profile.religion);
  $('#preview_nationalid').text(profile.nationalId);
  $('#preview_telephone').text(profile.telephone);
  $('#preview_email').text(profile.email);
  $('#preview_child').text(profile.childCount);
  $('#preview_marital').text(profile.maritalStatus);

  // Address
  const address = pdfData.address;
  $('#preview_address').text(
    `${address.current} ถ.${address.street} ต.${address.subDistrict} อ.${address.district} จ.${address.province} ${address.zipCode}`
  );
  $('#preview_address_status').text(address.status);

  // Emergency contact
  const emergency = address.emergency;
  $('#preview_namecontact').text(emergency.name);
  $('#preview_relationcontact').text(emergency.relation);
  $('#preview_telcontact').text(emergency.telephone);
  $('#preview_addresscontact').text(emergency.address);

  // Military status
  if (profile.militaryStatus) {
    $('#preview_military_display').show();
    $('#preview_military').text(profile.militaryStatus);
  } else {
    $('#preview_military_display').hide();
  }

  // Education
  displayEducationPreview(pdfData.edu);

  // Work
  displayWorkPreview(pdfData.work);

  // Language
  displayLanguagePreview(pdfData.lang);

  // Training
  displayTrainingPreview(pdfData.training);

  // Vehicle
  const vehicle = pdfData.vehicle;
  $('#preview_car_drive').text(vehicle.carDrive);
  $('#preview_car_owner').text(vehicle.carOwn === 'มี' ? `มี, ทะเบียน: ${vehicle.carRegNo}` : 'ไม่มี');
  $('#preview_motorcycle_drive').text(vehicle.motorcycleDrive);
  $('#preview_motorcycle_owner').text(vehicle.motorcycleOwn === 'มี' ? `มี, ทะเบียน: ${vehicle.motorcycleRegNo}` : 'ไม่มี');

  // Health
  const health = pdfData.health;
  $('#preview_generalhealth').html(health.generalHealth.replace(/\n/g, '<br/>'));
  $('#preview_congenital_disease').html(health.congenitalDisease.replace(/\n/g, '<br/>'));
  $('#preview_hospital').html(health.hospital.replace(/\n/g, '<br/>'));
  $('#preview_crime').html(health.crime.replace(/\n/g, '<br/>'));
  $('#preview_crimecheck').html(health.crimeCheck.replace(/\n/g, '<br/>'));

  // Additional
  const additional = pdfData.additional;
  $('#preview_more_weakness').text(additional.weakness);
  $('#preview_more_strength').text(additional.strength);
  $('#preview_more_reason').text(additional.reason);
  $('#preview_more_who').text(additional.knownPerson);
  $('#preview_more_who_position').text(additional.knownPersonPosition);
  $('#preview_more_fnfooter').text(getFullnameFooter());

  // Reference
  const reference = pdfData.reference;
  $('#preview_ref_name').text(`${reference.prefix}${reference.name}`);
  $('#preview_ref_telephone').text(reference.telephone);
  $('#preview_ref_workstation').text(reference.workStation);
  $('#preview_ref_position').text(reference.position);
}

function displayEducationPreview(edu) {
  const previewHtml = edu.map((e, i) => `
    <div class="mb-4">
      <div class="columns mb-0">
        <div class="column has-text-weight-bold py-0 pb-4">${i + 1}. ${e.name}</div>
      </div>
      <div class="columns mb-0">
        <div class="column is-one-third has-text-weight-bold py-0">ระดับการศึกษา</div>
        <div class="column py-0 pb-4">: ${e.level}</div>
      </div>
      ${e.faculty !== '-' ? `
      <div class="columns mb-0">
        <div class="column is-one-third has-text-weight-bold py-0">คณะ</div>
        <div class="column py-0 pb-4">: ${e.faculty}</div>
      </div>
      ` : ''}
      <div class="columns mb-0">
        <div class="column is-one-third has-text-weight-bold py-0">สาขา</div>
        <div class="column py-0 pb-4">: ${e.branch}</div>
      </div>
      <div class="columns mb-0">
        <div class="column is-one-third has-text-weight-bold py-0">เกรดเฉลี่ย</div>
        <div class="column py-0 pb-4">: ${e.gpa}</div>
      </div>
      <div class="columns mb-0">
        <div class="column is-one-third has-text-weight-bold py-0">ปีการศึกษา</div>
        <div class="column py-0 pb-4">: ${e.year}</div>
      </div>
    </div>
  `).join('');

  $('#preview_edu').html(previewHtml);
}

function displayWorkPreview(work) {
  const previewHtml = work.map((w, i) => `
    <div class="mb-4">
      <div class="columns mb-0">
        <div class="column has-text-weight-bold py-0 pb-4">${i + 1}. ${w.station}</div>
      </div>
      <div class="columns mb-0">
        <div class="column py-0">
          <div class="columns mb-0">
            <div class="column is-one-third has-text-weight-bold py-0">ระยะเวลา</div>
            <div class="column py-0 pb-4">: ${w.period}</div>
          </div>
          <div class="columns mb-0">
            <div class="column is-one-third has-text-weight-bold py-0">ตำแหน่ง</div>
            <div class="column py-0 pb-4">: ${w.position}</div>
          </div>
        </div>
        <div class="column py-0">
          <div class="columns mb-0">
            <div class="column is-one-third has-text-weight-bold py-0">เป็นเวลา</div>
            <div class="column py-0 pb-4">: ${w.years} ปี ${w.months} เดือน</div>
          </div>
          <div class="columns mb-0">
            <div class="column is-one-third has-text-weight-bold py-0">เงินเดือน</div>
            <div class="column py-0 pb-4">: ${w.salary} บาท</div>
          </div>
        </div>
      </div>
      <div class="columns mb-0">
        <div class="column py-0 pb-4" style="white-space: pre-wrap;">
          <span class="has-text-weight-bold">หน้าที่ความรับผิดชอบ:</span><br/>
          - ${w.responsibility}
        </div>
      </div>
      <div class="columns mb-0">
        <div class="column py-0 pb-4" style="white-space: pre-wrap;">
          <span class="has-text-weight-bold">สาเหตุที่ลาออก:</span><br/>
          - ${w.reason}
        </div>
      </div>
    </div>
  `).join('');

  $('#preview_work').html(previewHtml);
}

function displayLanguagePreview(lang) {
  const previewHtml = lang.map(l => `
    <tr>
      <td>${l.name}</td>
      <td class="has-text-centered">${l.listen}</td>
      <td class="has-text-centered">${l.speak}</td>
      <td class="has-text-centered">${l.read}</td>
      <td class="has-text-centered">${l.write}</td>
    </tr>
  `).join('');

  $('#preview_language').html(previewHtml);
}

function displayTrainingPreview(training) {
  const previewHtml = training.map(t => `
    <tr>
      <td>${t.name}</td>
      <td>${t.institute}</td>
      <td>${t.degree}</td>
      <td>${t.period}</td>
    </tr>
  `).join('');

  $('#preview_training').html(previewHtml);
}

// ============================================
// PDF DOCUMENT BUILDING
// ============================================

/**
 * Build complete PDF document structure
 */
function buildPdfDocument(pdfData) {
  const profile = pdfData.profile;
  const address = pdfData.address;
  
  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    
    info: {
      title: 'ใบสมัครงาน'
    },

    content: [
      // Header with logo
      {
        image: pdfData.images.logo,
        width: 100,
        margin: [0, -10, 0, 5],
        style: 'logo'
      },

      // Title and basic info
      buildHeaderSection(pdfData),

      // Profile and address section
      {
        columns: [
          {
            width: '50%',
            stack: [
              buildProfileSection(pdfData),
              buildAddressSection(pdfData),
              buildStatusSection(pdfData)
            ]
          },
          {
            width: '50%',
            stack: [
              buildEducationSection(pdfData.edu)
            ]
          }
        ],
        columnGap: 15
      },

      // Page break
      { pageBreak: 'before' },

      // Language and reference section
      {
        columns: [
          {
            width: '50%',
            stack: [
              buildLanguageSection(pdfData.lang),
              buildReferenceSection(pdfData.reference)
            ]
          },
          {
            width: '50%',
            stack: [
              buildVehicleSection(pdfData.vehicle),
              buildKnownPersonSection(pdfData.additional)
            ]
          }
        ],
        columnGap: 15
      },

      // Health and additional info
      buildAdditionalSection(pdfData),

      // Page break
      { pageBreak: 'before' },

      // Training and work section
      {
        stack: [
          buildTrainingSection(pdfData.training),
          buildWorkSection(pdfData.work),
          buildEmergencyContactSection(pdfData.address.emergency)
        ]
      },

      // Images and signature
      buildImageSection(pdfData),

      // Footer
      {
        text: getFullnameFooter(),
        bold: true,
        alignment: 'center',
        margin: [0, -10, 0, 0]
      }
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
}

// ============================================
// PDF SECTION BUILDERS
// ============================================

function buildHeaderSection(pdfData) {
  const head = pdfData.head;
  return {
    columns: [
      {
        image: pdfData.images.profile,
        width: 100,
        alignment: 'left'
      },
      {
        width: '75%',
        alignment: 'left',
        stack: [
          {
            text: 'ใบสมัครงาน',
            style: 'header',
            margin: [-100, 0, 0, 0]
          },
          {
            text: [
              { text: 'วันที่สมัคร', bold: true },
              { text: ' : ' + head.today }
            ],
            style: 'rightText'
          },
          {
            table: {
              widths: [110, 'auto'],
              body: [
                [{ text: 'สมัครในตำแหน่ง', bold: true }, ': ' + head.applyPosition],
                [{ text: 'รายได้ที่ต้องการ', bold: true }, ': ' + getDesiredIncomeText()],
                [{ text: 'วันที่เริ่มทำงาน', bold: true }, ': ' + head.workStart]
              ]
            },
            layout: getTableLayout('noLine')
          }
        ],
        style: 'contentDetail'
      }
    ],
    columnGap: 20,
    margin: [0, 0, 0, 20]
  };
}

function buildProfileSection(pdfData) {
  const profile = pdfData.profile;
  return {
    margin: [0, 10, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ประวัติส่วนตัว\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [65, 'auto', 40, '*'],
          body: [
            [{ text: 'ชื่อ - สกุล', bold: true }, { text: `: ${profile.prefix}${profile.firstName} ${profile.lastName} (${profile.nickname})`, colSpan: 3 }, {}, {}],
            [{}, { text: `: ${profile.ePrefix}${profile.eFirstName} ${profile.eLastName}`, colSpan: 3 }, {}, {}],
            [{ text: 'น้ำหนัก', bold: true }, `: ${profile.weight} ก.ก.`, { text: 'ส่วนสูง', bold: true }, `: ${profile.height} ซ.ม.`],
            [{ text: 'วันเดือนปีเกิด', bold: true }, { text: `: ${profile.birthday}`, colSpan: 3 }, {}, {}],
            [{ text: 'อายุ', bold: true }, { text: `: ${profile.ageYears} ปี ${profile.ageMonths} เดือน`, colSpan: 3 }, {}, {}],
            [{ text: 'สัญชาติ', bold: true }, `: ${profile.nationality}`, { text: 'เชื้อชาติ', bold: true }, `: ${profile.race}`],
            [{ text: 'ศาสนา', bold: true }, { text: `: ${profile.religion}`, colSpan: 3 }, {}, {}],
            [{ text: 'เลขบัตรประชาชน', bold: true }, { text: `: ${profile.nationalId}`, colSpan: 3 }, {}, {}],
            [{ text: 'เบอร์โทรศัพท์', bold: true }, { text: `: ${profile.telephone}`, colSpan: 3 }, {}, {}],
            [{ text: 'อีเมล', bold: true }, { text: `: ${profile.email}`, colSpan: 3 }, {}, {}]
          ]
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildAddressSection(pdfData) {
  const address = pdfData.address;
  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ที่อยู่ปัจจุบัน\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        text: `- ${address.current} ถ.${address.street} ต.${address.subDistrict} อ.${address.district} จ.${address.province}\n` +
              ` รหัสไปรษณีย์ ${address.zipCode}\n` +
              ` - ${address.status}\n\n`
      }
    ]
  };
}

function buildStatusSection(pdfData) {
  const profile = pdfData.profile;
  const militaryDisplay = profile.militaryStatus ? { text: 'สถานภาพทางการ', bold: true } : '';
  const militaryStatus = profile.militaryStatus ? `: ${profile.militaryStatus}` : '';

  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'สถานภาพ\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [60, 'auto'],
          body: [
            [{ text: 'การสมรส', bold: true }, `: ${profile.maritalStatus}`],
            [{ text: 'บุตร', bold: true }, `: ${profile.childCount}`],
            ...(profile.militaryStatus ? [[militaryDisplay, militaryStatus]] : [])
          ]
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildEducationSection(edu) {
  const eduTable = [];
  
  edu.forEach((e, i) => {
    eduTable.push(
      [{ text: `${i + 1}. ${e.name}`, bold: true, colSpan: 2 }, {}],
      [{ text: 'ระดับการศึกษา', bold: true }, `: ${e.level}`],
      ...(e.faculty !== '-' ? [[{ text: 'คณะ', bold: true }, `: ${e.faculty}`]] : []),
      [{ text: 'สาขา', bold: true }, `: ${e.branch}`],
      [{ text: 'เกรดเฉลี่ย', bold: true }, `: ${e.gpa}`],
      [{ text: 'ปีการศึกษา', bold: true }, `: ${e.year}`],
      [{ text: ' ', colSpan: 2 }, {}]
    );
  });

  return {
    margin: [0, 10, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ประวัติการศึกษา\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [70, 'auto'],
          body: eduTable
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildLanguageSection(lang) {
  const langTable = [
    [
      { text: 'ภาษา', bold: true },
      { text: 'การฟัง', bold: true, alignment: 'center' },
      { text: 'การพูด', bold: true, alignment: 'center' },
      { text: 'การอ่าน', bold: true, alignment: 'center' },
      { text: 'การเขียน', bold: true, alignment: 'center' }
    ]
  ];

  lang.forEach(l => {
    langTable.push([
      l.name,
      { text: l.listen, alignment: 'center' },
      { text: l.speak, alignment: 'center' },
      { text: l.read, alignment: 'center' },
      { text: l.write, alignment: 'center' }
    ]);
  });

  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ทักษะทางภาษา\n',
        style: 'subHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*'],
          body: langTable
        }
      }
    ]
  };
}

function buildTrainingSection(training) {
  const trainingTable = [
    [
      { text: 'หลักสูตร', bold: true, alignment: 'center' },
      { text: 'ส��าบัน', bold: true, alignment: 'center' },
      { text: 'วุฒิ', bold: true, alignment: 'center' },
      { text: 'ระยะเวลา', bold: true, alignment: 'center' }
    ]
  ];

  training.forEach(t => {
    trainingTable.push([
      t.name,
      t.institute,
      t.degree,
      t.period
    ]);
  });

  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ประวัติการฝีกอบรม\n',
        style: 'subHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto'],
          body: trainingTable
        }
      }
    ]
  };
}

function buildWorkSection(pdfData) {
  const workTable = [];

  pdfData.forEach((w, i) => {
    workTable.push(
      [{ text: `${i + 1}. ${w.station}`, bold: true, colSpan: 4 }, {}, {}, {}],
      [{ text: 'ระยะเวลา', bold: true }, { text: `: ${w.period}` }, { text: 'เป็นเวลา', bold: true }, { text: `: ${w.years} ปี ${w.months} เดือน` }],
      [{ text: 'ตำแหน่ง', bold: true }, { text: `: ${w.position}` }, { text: 'เงินเดือน', bold: true }, { text: `: ${w.salary} บาท` }],
      [{ text: 'เบอร์โทรศัพท์', bold: true }, { text: `: ${w.telephone}` }, {}, {}],
      [{ text: 'หน้าที่ความรับผิดชอบ:', bold: true, colSpan: 4 }, {}, {}, {}],
      [{ text: `- ${w.responsibility}`, colSpan: 4 }, {}, {}, {}],
      [{ text: 'สาเหตุที่ลาออก:', bold: true, colSpan: 4 }, {}, {}, {}],
      [{ text: `- ${w.reason}`, colSpan: 4 }, {}, {}, {}],
      [{ text: ' ', colSpan: 4 }, {}, {}, {}]
    );
  });

  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ประวัติการทำงาน\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [80, 185, 80, 'auto'],
          body: workTable
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildReferenceSection(reference) {
  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'บุคคลอ้างอิง\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [80, 'auto'],
          body: [
            [{ text: 'ชื่อ - สกุล', bold: true }, `: ${reference.prefix}${reference.name}`],
            [{ text: 'เบอร์โทรศัพท์', bold: true }, `: ${reference.telephone}`],
            [{ text: 'สถานที่ทำงาน', bold: true }, `: ${reference.workStation}`],
            [{ text: 'ตำแหน่ง', bold: true }, `: ${reference.position}`]
          ]
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildVehicleSection(vehicle) {
  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ยานพาหนะ\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        text: 'ความสามารถในการขับขี่',
        bold: true
      },
      {
        table: {
          widths: [80, 'auto'],
          body: [
            [{ text: '- รถยนต์', bold: true }, `: ${vehicle.carDrive}`],
            [{ text: '- รถจักรยานยนต์', bold: true }, `: ${vehicle.motorcycleDrive}`]
          ]
        },
        layout: getTableLayout('noLine')
      },
      {
        text: 'ยานพาหนะที่มี',
        bold: true,
        margin: [0, 10, 0, 0]
      },
      {
        table: {
          widths: [80, 'auto'],
          body: [
            [{ text: '- รถยนต์', bold: true }, `: ${vehicle.carOwn === 'มี' ? `มี, ทะเบียน: ${vehicle.carRegNo}` : 'ไม่มี'}`],
            [{ text: '- รถจักรยานยนต์', bold: true }, `: ${vehicle.motorcycleOwn === 'มี' ? `มี, ทะเบียน: ${vehicle.motorcycleRegNo}` : 'ไม่มี'}`]
          ]
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildKnownPersonSection(additional) {
  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'บุคคลที่รู้จักในนี้\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [80, 'auto'],
          body: [
            [{ text: 'ชื่อ - สกุล', bold: true }, `: ${additional.knownPerson}`],
            [{ text: 'ตำแหน่ง', bold: true }, `: ${additional.knownPersonPosition}`]
          ]
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildAdditionalSection(pdfData) {
  const health = pdfData.health;
  const additional = pdfData.additional;

  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'ข้อมูลเพิ่มเติม\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        text: [
          { text: 'ความบกพร่องของร่างกาย หรือโรคติดต่อเรื้อรัง\n', bold: true },
          { text: `${health.congenitalDisease}\n` },
          { text: 'เคยเจ็บป่วยหรือได้รับอุบัติเหตุจนต้องเข้ารพ.\n', bold: true },
          { text: `${health.hospital}\n` },
          { text: 'สุขภาพโดยทั่วไป\n', bold: true },
          { text: `${health.generalHealth}\n` },
          { text: 'เคยถูกศาลพิพากษาให้เป็นบุคคลล้มละลาย หรือเคยทำผิดทางอาญา\n', bold: true },
          { text: `${health.crime}\n` },
          { text: 'ยินยอมให้บริษัทตรวจประวัติอาชญากรรมหรือไม่\n', bold: true },
          { text: `${health.crimeCheck}\n` },
          { text: 'จุดอ่อนของตนเอง:\n', bold: true },
          { text: `${additional.weakness}\n` },
          { text: 'จุดแข็งของตนเอง:\n', bold: true },
          { text: `${additional.strength}\n` },
          { text: 'สาเหตุที่สมัครงานที่นี่:\n', bold: true },
          { text: `${additional.reason}\n` }
        ]
      }
    ]
  };
}

function buildEmergencyContactSection(emergency) {
  return {
    margin: [0, 20, 0, 0],
    style: 'contentDetail',
    stack: [
      {
        text: 'บุคคลที่สามารถติดต่อได้ในกรณีเร่งด่วน\n',
        style: 'subHeader'
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 0.8 }],
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: [60, 'auto'],
          body: [
            [{ text: 'ชื่อ', bold: true }, `: ${emergency.name}`],
            [{ text: 'ความสัมพันธ์', bold: true }, `: ${emergency.relation}`],
            [{ text: 'เบอร์โทร', bold: true }, `: ${emergency.telephone}`],
            [{ text: 'ที่อยู่', bold: true }, `: ${emergency.address}`]
          ]
        },
        layout: getTableLayout('noLine')
      }
    ]
  };
}

function buildImageSection(pdfData) {
  return [
    {
      image: pdfData.images.idCard,
      width: 500,
      style: 'logo'
    },
    {
      image: pdfData.images.consent,
      width: 500,
      style: 'logo'
    },
    {
      image: pdfData.images.signature,
      fit: [200, 200],
      style: 'logo',
      margin: [0, 10, 0, 0]
    }
  ];
}

// ============================================
// TABLE LAYOUT HELPERS
// ============================================

function getTableLayout(type) {
  const layouts = {
    'noLine': {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0
    },
    'bordered': {
      hLineWidth: () => 1,
      vLineWidth: () => 1
    }
  };
  return layouts[type] || layouts['noLine'];
}

// ============================================
// PDF GENERATION & EXPORT
// ============================================

/**
 * Generate PDF from document definition and handle export
 */
function generateAndExportPdf(docDefinition, pdfData) {
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
  pdfDocGenerator.getBase64((data) => {
    // Create export data object
    exportData = {
      head: pdfData.head,
      profile: pdfData.profile,
      address: pdfData.address,
      edu: pdfData.edu,
      work: pdfData.work,
      lang: pdfData.lang,
      training: pdfData.training,
      vehicle: pdfData.vehicle,
      health: pdfData.health,
      additional: pdfData.additional,
      reference: pdfData.reference,
      images: pdfData.images,
      pdfdat: 'data:application/pdf;base64,' + data
    };

    // Setup download button
    $('#download_btn').attr('href', `data:application/pdf;base64,${data}`);
    $('#pdfdat').val(data);

    // Setup print button
    $('#print_btn').click(() => {
      printJS({ 
        printable: data, 
        type: 'pdf', 
        base64: true 
      });
    });

    // Switch to preview view
    $('#main_form').hide();
    $('#preview_form').show();
    scrollToID('#preview_form');

    // Show success message
    showSuccessAlert();

    // Post data to server
    postData(exportData, "addApplicant");
  });
}

// ============================================
// ALERTS & NOTIFICATIONS
// ============================================

function showSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'สำ���ร็จ',
    html: 'กรุณาพิมพ์ใบสมัคร และรอการติดต่อกลับจากเจ้าหน้าที่',
    confirmButtonText: 'ตกลง',
    confirmButtonColor: '#8CBA40'
  });
}

function showErrorAlert(message) {
  Swal.fire({
    icon: 'error',
    title: 'ผิดพลาด',
    text: message,
    confirmButtonText: 'ตกลง',
    confirmButtonColor: '#FF5252'
  });
}

// ============================================
// DATA SUBMISSION
// ============================================

/**
 * Post data to Google Apps Script endpoint
 */
async function postData(obj, action) {
  try {
    Swal.fire({
      title: "กำลังส่งข้อมูล...",
      text: "โปรดรอสักครู่",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

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
    console.error('Error posting data:', error);
    showErrorAlert('เกิดข้อผิดพลาดในการส่งข้อมูล');
  }
}
