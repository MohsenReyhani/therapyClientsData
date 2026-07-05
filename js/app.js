window.addEventListener("DOMContentLoaded", () => {

    // Collect all form data
    function getFormData() {
        console.log((document.getElementById("visitDate").value || "").replaceAll("/", "."));
        return {
            visitDate: (document.getElementById("visitDate").value || "").replaceAll("/", "."),
            fullName: document.getElementById("fullName").value,
            age: document.getElementById("age").value,
            job: document.getElementById("job").value,
            maritalStatus: getCheckedLabels("maritalStatus"),
            education: document.getElementById("education").value,

            homeAddress: document.getElementById("homeAddress").value,
            workAddress: document.getElementById("workAddress").value,
            phone: document.getElementById("phone").value,

            mainIssue: document.getElementById("mainIssue").value,
            duration: document.getElementById("duration").value,
            
            pastTherapy: document.getElementById("pastTherapy").value,
            medications: document.getElementById("medications").value,        
            physicalIllness: document.getElementById("physicalIllness").value,
            sleepPattern: document.getElementById("sleepPattern").value,
            energyLevel: document.getElementById("energyLevel").value,
            appetite: document.getElementById("appetite").value,

            familyMain: document.getElementById("familyMain").value,
            familyPosition: document.getElementById("familyPosition").value,
            familyCurrent: document.getElementById("familyCurrent").value,
            familyEvent: document.getElementById("familyEvent").value,
            currentRelationship: document.getElementById("currentRelationship").value,

            alcohol: getCheckedLabels("alcohol"),
            smoking: getCheckedLabels("smoking"),
            drugs: getCheckedLabels("drugs"),

            stressThoughts: document.getElementById("stressThoughts").value,
            desperateExperince: document.getElementById("desperateExperince").value,
            harmselfActs: document.getElementById("harmselfActs").value,
            highriskActs: document.getElementById("highriskActs").value,

            signature: getSignature()
        };

    }

    function getCheckedLabels(name) {
        const checked = document.querySelectorAll(`input[name="${name}"]:checked`);

        return Array.from(checked).map(cb => {
            return cb.parentElement.textContent.trim();
        });
    }

    // Validation
    function validateForm(data) {
    if (!data.fullName) {
        showNotification("لطفاً نام و نام خانوادگی را وارد کنید", "error");
        return false;
    }

    if (!data.phone) {
        showNotification("لطفاً شماره تلفن را وارد کنید", "error");
        return false;
    }

    if (signaturePad.isEmpty()) {
        showNotification("لطفاً امضا را وارد کنید", "error");
        return false;
    }

    return true;
    }

    
    // expose functions to HTML
    window.clearSignature = clearSignature;
    window.submitForm = submitForm;
    
    jalaliDatepicker.startWatch({
        separator: "/"
    });

    document.getElementById("visitDate").value = getTodayJalali();

    function showLoading() {
        document.getElementById("loadingOverlay").classList.remove("hidden");
        document.getElementById("submitBtn").disabled = true;
    }

    function hideLoading() {
        document.getElementById("loadingOverlay").classList.add("hidden");
        document.getElementById("submitBtn").disabled = false;
    }

    // Submit
    async function submitForm() {
        const data = getFormData();
        if (!validateForm(data)) return;
        showLoading();

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxYIcg5EJ43fmTl0jquHyqRXpL-eN53NnH1LPVb5Lf74PrzET0a-qsBV8IU4IOMjOEj/exec";

        if (!validateForm(data)) return;

        try {
            const response = await fetch(WEB_APP_URL, {
                method: "POST",
                body: formData,
                keepalive: true
            });

            const result = await response.json();

            if (result.success) {
                showNotification(" فرم با موفقیت ثبت شد. ✅", "success", true);
            } else {
                showNotification("خطا ثبت فرم ❌", "error");
            }

        } catch (err) {
            showNotification(" خطا اتصال ❌", "error");
            console.error(err);
        } finally {
            hideLoading();
        }
    }


});