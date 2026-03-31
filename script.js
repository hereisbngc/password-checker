const input = document.getElementById("password");
const bar = document.getElementById("strengthBar");
const text = document.getElementById("strengthText");
const percent = document.getElementById("percent");
const crack = document.getElementById("crackTime");

const toggle = document.getElementById("toggle");
const copy = document.getElementById("copy");
const generate = document.getElementById("generate");
const warning = document.getElementById("warning");

const common = ["123456", "password", "qwerty", "111111"];

toggle.onclick = () => {
    input.type = input.type === "password" ? "text" : "password";
};

copy.onclick = () => {
    navigator.clipboard.writeText(input.value);
    alert("Đã copy!");
};

generate.onclick = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < 12; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    input.value = pass;
    input.dispatchEvent(new Event("input"));
};

input.addEventListener("input", () => {
    let val = input.value;
    let score = 0;

    let checks = {
        length: val.length >= 8,
        upper: /[A-Z]/.test(val),
        number: /[0-9]/.test(val),
        special: /[\W]/.test(val)
    };

    for (let key in checks) {
        let el = document.getElementById(key);
        if (checks[key]) {
            el.classList.add("valid");
            el.classList.remove("invalid");
            score++;
        } else {
            el.classList.add("invalid");
            el.classList.remove("valid");
        }
    }

    let strength = score * 25;
    bar.style.width = strength + "%";

    if (strength <= 25) {
        bar.style.background = "red";
        text.innerText = "Yếu";
    } else if (strength <= 75) {
        bar.style.background = "orange";
        text.innerText = "Trung bình";
    } else {
        bar.style.background = "lime";
        text.innerText = "Mạnh";
    }

    percent.innerText = strength + "%";

    if (val.length < 6) crack.innerText = "Crack: vài giây";
    else if (val.length < 10) crack.innerText = "Crack: vài phút";
    else crack.innerText = "Crack: hàng năm";

    if (common.includes(val)) {
        warning.innerText = "Mật khẩu quá phổ biến!";
    } else {
        warning.innerText = "";
    }
});
