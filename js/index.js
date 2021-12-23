const api = "https://www.datos.gov.co/resource/8hn7-rpp8.json";


const getAll = async () => {
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

getAll().then(data => {
    console.log(data);
});


document.getElementById("btnCargar").addEventListener("click", (e) => {
    const todos = getAll()
        .then(data => {
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
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
                <td>$${element.ingresos_operacionales_2018} <a href="#"> > </a></td> `;
            });
            htmlTabla = htmlTabla + ` </tbody > </table > `;
            element.innerHTML = htmlTabla;
            divApp.appendChild(element);
        });
});
