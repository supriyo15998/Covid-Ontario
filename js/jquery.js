$(document).ready(() => {
    class Jsonobj {
        constructor() {
            this.id = 1;
            this.reportdate = "";
            this.previousdose = "";
            this.totaldoseadm = "";
            this.totaldosefullyvaccinated = "";
            this.totalindivuduals = ""
        }
    }
    
    $("#loadstrg").on("click",function() {
        $.ajax({
            url: '../json/vaccine_doses.json',
            method: "get",
            contentType: "jsonp",
            success: storeJson,
            error: error_json
        });

        function error_json() {
            alert("Failed to load JSON data ");
        };

        function storeJson(data) {
            localStorage.clear()
            for (i in data) {
                var jsonobj = new Jsonobj();
                jsonobj.id = parseInt(i) + 1;
                jsonobj.reportdate = data[i].report_date;
                jsonobj.previousdose = data[i].previous_day_doses_administered;
                jsonobj.totaldoseadm = data[i].total_doses_administered;
                jsonobj.totaldosefullyvaccinated = data[i].total_doses_in_fully_vaccinated_individuals;
                jsonobj.totalindivuduals = data[i].total_individuals_fully_vaccinated;
                localStorage.setItem(jsonobj.reportdate,JSON.stringify(jsonobj));
            }
            alert("Data Saved!");
        };
    });
    $("#listdisplay").on("click",() => {
        $("#headerID").html("Summary of Total Vaccine Doses Administered in Ontario. <br>");
        
        let keys = Object.keys(localStorage);
        // localStorage.clear();
        keys.sort((a,b) => {
            a = a.split('/').reverse().join('');
            b = b.split('/').reverse().join('');
            return a > b ? 1 : a < b ? -1 : 0;
        });
        console.log(keys);
        keys.forEach((k, i) => {
            $("#mainlist").append(`<li style="z-index: 100" id="list-${i}">${k}</li>`)
            $(`#list-${i}`).click(function() {
                let data = JSON.parse(localStorage.getItem($(this).text()));
                $('#detail').append("ID: " + data.id + "<br>");
                $('#detail').append("Report date: " + data.reportdate + "<br>");
                $('#detail').append("Previous Dose: " + data.previousdose + "<br>");
                $('#detail').append("Total Dose Administered: " + data.totaldoseadm + "<br>");
                $('#detail').append("Total Dose fully vaccinated: " + data.totaldosefullyvaccinated + "<br>");
                $('#detail').append("Total Individuals: " + data.totalindivuduals + "<br>");
            });
        });
        
    });
    
});