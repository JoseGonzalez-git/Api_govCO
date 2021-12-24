const api = "https://www.datos.gov.co/resource/8hn7-rpp8.json";

var datosJson;

function Clear(){
    let table = document.getElementById('app');

    table.innerHTML = '';
}

async function getAll() {
    try {
        const response = await fetch(api);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.log("Error: " + error);

    }
}

document.getElementById("btnCargar").addEventListener("click", (e) => {
    const todos = getAll()
        .then(data => {
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
            Clear();
            element.className = 'row';
            let htmlTabla = `<table class="table-dark" id="tablaDatos">
                            <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nit</th>
                            <th scope="col">Razon social</th>
                            <th scope="col">Total patrimonio 2018</th>
                            </tr>
                            </thead>`;
            data.forEach((element) => {
                htmlTabla = htmlTabla + `<tr>
                <td scope = "row">${element.no}</td>
                <td>${element.nit}</td>
                <td>${element.razon_social}</td>
                <td>$${element.ingresos_operacionales_2018}
                <br/>
                <a href="#" onclick="getAllAboutOne(${element.nit});return false;">Ver Datos</a>
                </td> `;
            });
            htmlTabla = htmlTabla + ` </tbody > </table > `;
            element.innerHTML = htmlTabla;
            divApp.appendChild(element);
        });
});

async function getAllAboutOne(nit) {
    try {
        const newUrl = api + "?nit=" + nit;
        const response = await fetch(newUrl);
        if (response.status === 200) {
            const data = await response.json();
            return alert(`Nit: ${data[0].nit} 
            \nSupervisor: ${data[0].supervisor}
            \nCIIU: ${data[0].ciiu}
            \nRazon social: ${data[0].razon_social}
            \nMacrosector: ${data[0].macrosector}
            \nIngresos operacionales 2018: ${data[0].ingresos_operacionales_2018}
            \nIngresos operacionales 2017: ${data[0].ingresos_operacionales_2017}
            \nTotal Patriminio 2018: ${data[0].total_patrimonio_2018}
            \nTotal Patriminio 2017: ${data[0].total_patrimonio_2017}`);
        }
    } catch (error) {
        console.error(error);
    }

}

document.getElementById("btnSector").addEventListener("click", (e) => getM());

async function getM() {

    let mensaje = "";
    let total = 0;
    let data = await getAll();
    let macrosectores = await getMacrosectores();


    const filterdata = data.map(element => {
        let newdata = { macros: element.macrosector };
        return newdata;
    });

    for (let i = 0; i < macrosectores.length; i++) {
        for (let j = 0; j < filterdata.length; j++) {
            if (macrosectores[i] === filterdata[j].macros) {
                total += 1;
            }
        }
        mensaje = mensaje + `${macrosectores[i]} , ${total}\n`;
        total = 0;
    }
    alert(`Listado de Macrosectores y el numero Total de Empresas  ${mensaje}`);

}

async function getMacrosectores() {
    try {
        const response = await fetch(api);
        if (response.status === 200) {
            const data = await response.json();
            if (data.length > 0) {
                const macrosectores = data.map(element => element.macrosector);
                const filteredMacroSectores = macrosectores.filter((element, index) => macrosectores.indexOf(element) === index);
                return filteredMacroSectores;
            }
        }
    } catch (error) {
        console.log("Error: " + error);
    }
}


document.getElementById("btnCalcular").addEventListener("click", (e) => {
    const todos = getAll()
        .then(data => {
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
            Clear();
            element.className = 'row';
            let htmlTabla = `<table class="table-dark" id="tablaDatos">
                            <thead>
                            <tr>
                            <th scope="col">Nit</th>
                            <th scope="col">Razón Social</th>
                            <th scope="col">Diferencia De Ingresos [2018-2017]</th>
                            <th scope="col">Diferencia De Patrimonios [2018-2017]</th>
                            </tr>
                            </thead>`;
            data.forEach((element) => {
                htmlTabla = htmlTabla + `<tr>
                <td scope = "row">${element.nit}</td>
                <td>${element.razon_social}</td>
                <td>$${element.ingresos_operacionales_2018 - element.ingresos_operacionales_2017}</td>
                <td>$${element.total_patrimonio_2018-element.total_patrimonio_2017}
                <br/>
                <a href="#" onclick="getAllAboutOne(${element.nit});return false;">Ver Datos</a>
                </td> `;
            });
            htmlTabla = htmlTabla + ` </tbody > </table > `;
            element.innerHTML = htmlTabla;
            divApp.appendChild(element);
        });
});