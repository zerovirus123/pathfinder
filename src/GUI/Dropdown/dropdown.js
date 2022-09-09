export function animateDropdown(toggleState)
{
    let dropdownContent = document.getElementById("dropdown__content");

    if(toggleState)
    {
        dropdownContent.classList.add("fadein");
        dropdownContent.style.transform = "translateY(2%)";
        dropdownContent.style.opacity = "1";
        dropdownContent.style.visibility = "visible";
        dropdownContent.childNodes.forEach(node => {
            node.classList.add("fadein");
        });
    }
    else{
        dropdownContent.classList.remove("fadein");
        dropdownContent.style.transform = "translateY(-2%)";
        dropdownContent.style.opacity = "0";
        dropdownContent.style.visibility = "hidden";
        dropdownContent.childNodes.forEach(node => {
            node.classList.remove("fadein");
        });
    }

}