/*
  Simple single-page flow: MSISDN -> PIN -> Thank you
  Language is toggled via ?CgLang=AR (Arabic) or defaults to English.
*/

document.addEventListener("DOMContentLoaded", function () {
    const sections = {
        msisdn: document.getElementById("msisdn-section"),
        pin: document.getElementById("pin-section"),
        thankYou: document.getElementById("thank-you"),
    };

    const inputs = {
        msisdn: document.getElementById("msisdn"),
        pin: document.getElementById("pin"),
    };

    const buttons = {
        submitMsisdn: document.getElementById("submit-msisdn"),
        submitPin: document.getElementById("submit-pin"),
    };

    const errors = {
        msisdn: document.getElementById("msisdn-error"),
        pin: document.getElementById("pin-error"),
    };

    const langButtons = document.querySelectorAll(".lang-btn");
    const disclaimerBlocks = document.querySelectorAll(".disclaimer-block");

    const strings = {
        en: {
            title: "ENTER YOUR MOBILE NUMBER",
            lead: "Get exclusive games now on your phone.",
            msisdnHint: "Enter your MSISDN (e.g., 00966544660609)",
            msisdnLabel: "Mobile number",
            submitMsisdn: "GET IT NOW",
            msisdnError: "Please enter a valid mobile number (digits only).",
            pinTitle: "Enter PIN",
            pinSub: "A PIN has been sent to your mobile number.",
            pinLabel: "PIN",
            submitPin: "VERIFY PIN",
            pinError: "Please enter a valid PIN (4-6 digits).",
            thankYouTitle: "Thank you!",
            thankYouSub: "Your subscription is now active.",
        },
        ar: {
            title: "أدخل رقم هاتفك الجوال",
            lead: "أدخل رقم هاتفك المحمول للمتابعة.",
            msisdnHint: "أدخل رقم MSISDN الخاص بك (مثال 00966544660609)",
            msisdnLabel: "رقم الجوال",
            submitMsisdn: "واصل",
            msisdnError: "يرجى إدخال رقم جوال صالح (أرقام فقط).",
            pinTitle: "أدخل رمز PIN",
            pinSub: "تم إرسال رمز PIN إلى رقم هاتفك.",
            pinLabel: "PIN",
            submitPin: "تأكيد الرمز",
            pinError: "يرجى إدخال رمز PIN صالح (4-6 أرقام).",
            thankYouTitle: "شكرًا لك!",
            thankYouSub: "تم تفعيل اشتراكك بنجاح.",
        },
    };

    function getQueryLang() {
        const urlParams = new URLSearchParams(window.location.search);
        const byParam = (urlParams.get("CgLang") || urlParams.get("lang") || "").toLowerCase();
        return byParam === "ar" ? "ar" : "en";
    }

    function setLanguage(lang) {
        const isAr = lang === "ar";
        document.documentElement.dir = isAr ? "rtl" : "ltr";
        document.body.classList.toggle("lang-ar", isAr);
        document.body.classList.toggle("lang-en", !isAr);

        const s = strings[lang];
       // alert(s.title)
       // alert(s.lead)
        document.getElementById("service-title").textContent = s.title;
      //  document.getElementById("lead-text").textContent = s.lead;
       // document.getElementById("msisdn-hint-text").textContent = s.msisdnHint;
       // document.getElementById("msisdn-label").textContent = s.msisdnLabel;
        document.getElementById("submit-msisdn-text").textContent = s.submitMsisdn;
        document.getElementById("pin-title").textContent = s.pinTitle;
        document.getElementById("pin-sub").textContent = s.pinSub;
        document.getElementById("pin-label").textContent = s.pinLabel;
        document.getElementById("submit-pin-text").textContent = s.submitPin;
        document.getElementById("thank-you-title").textContent = s.thankYouTitle;
        document.getElementById("thank-you-sub").textContent = s.thankYouSub;

        disclaimerBlocks.forEach((el) => {
            el.style.display = el.dataset.lang === lang ? "block" : "none";
        });

        langButtons.forEach((btn) => {
            btn.classList.toggle("is-active", btn.dataset.lang === lang);
        });
    }

    function showSection(name) {
        Object.keys(sections).forEach((key) => {
            sections[key].style.display = key === name ? "block" : "none";
        });
    }

    function showError(el, message) {
        if (!el) return;
        el.textContent = message;
        el.classList.add("is-show");
    }

    function clearError(el) {
        if (!el) return;
        el.textContent = "";
        el.classList.remove("is-show");
    }

    function validateMsisdn(value) {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
    }

    function validatePin(value) {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 4 && digits.length <= 6;
    }

    function setQueryLang(lang) {
        const url = new URL(window.location.href);
        url.searchParams.set("CgLang", lang.toUpperCase());
        window.history.replaceState(null, "", url.toString());
    }

    const progress = {
        pageCount: document.getElementById("pagecount"),
        progressSpan: document.querySelector(".progress-span"),
        circleValue: document.querySelector(".circle-value"),
    };

    function setProgress(step) {
        let targetPercentage = 0;
        let pageCount = 1;
        let fillColor = "rgba(38, 163, 255, 0)";

        if (step === 0) {
            targetPercentage = 0;
            pageCount = 1;
            fillColor = "rgba(38, 163, 255, 0)";
        } else if (step === 1) {
            targetPercentage = 50;
            pageCount = 1;
            fillColor = "#26a3ff";
        } else if (step === 2) {
            targetPercentage = 100;
            pageCount = 2;
            fillColor = "#0077ff";
        }

        if (progress.pageCount) progress.pageCount.textContent = pageCount;

        const circleElement = document.querySelector('.circle-progress');
        if (circleElement) {
            circleElement.style.setProperty('--progress-angle', `${targetPercentage * 3.6}deg`);
            circleElement.style.setProperty('--progress-color', targetPercentage === 0 ? '#ffffff' : '#26a3ff');
            circleElement.classList.add('is-animate');
            setTimeout(() => circleElement.classList.remove('is-animate'), 900);
        }

        const animateTo = (value) => {
            if (progress.progressSpan) {
                progress.progressSpan.style.background = fillColor;
                progress.progressSpan.style.width = `${value}%`;
            }
            if (progress.circleValue) {
                progress.circleValue.textContent = `${value}%`;
                progress.circleValue.style.color = '#ffffff';
                progress.circleValue.style.textShadow = '0 2px 12px rgba(0, 0, 0, .65), 0 0 8px rgba(64, 180, 255, .6)';
            }
            if (circleElement) {
                circleElement.style.setProperty('--progress-angle', `${value * 3.6}deg`);
            }
        };

        const duration = 600;
        const startTime = performance.now();

        const stepFrame = (currentTime) => {
            const elapsed = Math.min(duration, currentTime - startTime);
            const progressRatio = elapsed / duration;
            const progressValue = Math.round(progressRatio * targetPercentage);

            animateTo(progressValue);

            if (elapsed < duration) {
                window.requestAnimationFrame(stepFrame);
            } else {
                animateTo(targetPercentage);
            }
        };

        animateTo(0);
        window.requestAnimationFrame(stepFrame);
    }

    function showSection(name) {
        Object.keys(sections).forEach((key) => {
            sections[key].style.display = key === name ? "block" : "none";
        });

        if (name === "msisdn") setProgress(0);
        else if (name === "pin") setProgress(1);
        else if (name === "thankYou") setProgress(2);
    }

    const initialLang = getQueryLang();
    setLanguage(initialLang);
    setProgress(0); // initial state 0%
    showSection("msisdn");

    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            setQueryLang(lang);
        });
    });

    inputs.msisdn.addEventListener("input", (event) => {
        const field = event.target.closest(".field");
        event.target.value = event.target.value.replace(/\D/g, "");
        if (validateMsisdn(event.target.value)) {
            field.classList.add("is-valid");
        } else {
            field.classList.remove("is-valid");
        }
        clearError(errors.msisdn);
    });

    inputs.pin.addEventListener("input", (event) => {
        const field = event.target.closest(".field");
        event.target.value = event.target.value.replace(/\D/g, "");
        if (validatePin(event.target.value)) {
            field.classList.add("is-valid");
        } else {
            field.classList.remove("is-valid");
        }
        clearError(errors.pin);
    });

    buttons.submitMsisdn.addEventListener("click", () => {
        const value = inputs.msisdn.value.trim();
        if (!validateMsisdn(value)) {
            showError(errors.msisdn, strings[getQueryLang()].msisdnError);
            return;
        }
        setProgress(1); // 50% after entering MSISDN
        showSection("pin");
        inputs.pin.focus();
    });

    buttons.submitPin.addEventListener("click", () => {
        const value = inputs.pin.value.trim();
        if (!validatePin(value)) {
            showError(errors.pin, strings[getQueryLang()].pinError);
            return;
        }
        setProgress(2); // 100% after PIN
        showSection("thankYou");
    });

    [inputs.msisdn, inputs.pin].forEach((input) => {
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if (input === inputs.msisdn) {
                    buttons.submitMsisdn.click();
                } else if (input === inputs.pin) {
                    buttons.submitPin.click();
                }
            }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("msisdn")) {
        inputs.msisdn.value = urlParams.get("msisdn");
        inputs.msisdn.dispatchEvent(new Event("input"));
    }

    showSection("msisdn");
});
