fetch('read',
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
    }}).then(response => response.json()).then(data=>{
        const tbl = document.querySelector('#table');
        const tr = document.createElement('tr')
        const tdName = document.createElement('td')
        const tdYear = document.createElement('td')
        const tdlch = document.createElement('td')
        const tdchamp = document.createElement('td')
        const tdcountry = document.createElement('td')

        tdName.textContent="name"
        tdYear.textContent="year"
        tdlch.textContent="lch"
        tdchamp.textContent="champ"
        tdcountry.textContent="country"

        tr.appendChild(tdName)
        tr.appendChild(tdYear)
        tr.appendChild(tdlch)
        tr.appendChild(tdchamp)
        tr.appendChild(tdcountry)
        tbl.appendChild(tr)
        data.forEach(team=>{
            console.log(team)
            const trCont=document.createElement('tr');
            const tdNameCont = document.createElement('td')
            const tdYearCont = document.createElement('td')
            const tdlchCont = document.createElement('td')
            const tdchampCont = document.createElement('td')
            const tdcountryCont = document.createElement('td')
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');
            const tdButtonEdit = document.createElement('td');
            const tdButtonDel = document.createElement('td');
            editButton.textContent="Редактировать";
            deleteButton.textContent="Удалить"
            tdButtonEdit.appendChild(editButton);
            tdButtonDel.appendChild(deleteButton);

            tdNameCont.textContent=team.name
            tdYearCont.textContent=team.year
            tdlchCont.textContent=team.lch
            tdchampCont.textContent=team.champ
            tdcountryCont.textContent=team.country

            trCont.appendChild(tdNameCont)
            trCont.appendChild(tdYearCont)
            trCont.appendChild(tdlchCont)
            trCont.appendChild(tdchampCont)
            trCont.appendChild(tdcountryCont)
            tbl.appendChild(trCont)
            trCont.appendChild(tdButtonEdit);
            trCont.appendChild(tdButtonDel);
            editButton.addEventListener('click', () => {
                const oldForm = document.getElementById('editForm');
                if (oldForm) {
                    oldForm.remove();
                }

                const form = document.createElement("form");
                const name = document.createElement("input");
                const year = document.createElement("input");
                const lch = document.createElement("input");
                const champ = document.createElement("input");
                const country = document.createElement("input");
                const sub = document.createElement("input");
                form.id="editForm";
                sub.value="Редактировать";
                name.placeholder="Название клуба";
                name.value = team.name;
                name.id="name";
                year.placeholder="Год";
                year.value = team.year;
                year.id="year";
                lch.placeholder="Количество лч";
                lch.value = team.lch;
                lch.id="lch";
                champ.placeholder="Количество чемпионств";
                champ.value = team.champ;
                champ.id="champ"
                country.placeholder="Страна";
                country.value = team.country;
                country.id="country";
                sub.type="button";
                // Добавляем поля ввода и кнопку отправки в форму
                form.appendChild(name);
                form.appendChild(year);
                form.appendChild(lch);
                form.appendChild(champ);
                form.appendChild(country);
                form.appendChild(sub);

                // Добавляем форму на страницу
                document.body.appendChild(form);
                sub.addEventListener('click',()=>{
                    let Game = {
                        name: "",
                        champ: "",
                        lch: "",
                        year: "",
                        country: "",
                        id: ""
                    }
                    Game.name = document.getElementById("name").value;
                    Game.year = document.getElementById("year").value;
                    Game.lch = document.getElementById("lch").value;
                    Game.champ = document.getElementById("champ").value;
                    Game.country = document.getElementById("country").value;
                    Game.id=team.id;
                    var json = JSON.stringify(Game)
                    var xhr=new XMLHttpRequest()
                    var url ="update"
                    xhr.open("POST",url,true)
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.onreadystatechange=function (){
                        if(xhr.readyState==XMLHttpRequest.DONE){
                            console.log(xhr.responseText)
                        }
                    }
                    xhr.send(json)
                    location.href = location.href;
                    location.replace(location.href);
                })
            });
            deleteButton.addEventListener('click', () => {
                let Game = {
                    name: "",
                    champ: "",
                    lch: "",
                    year: "",
                    country: "",
                    id: ""
                }
                Game.id=team.id;
                var json = JSON.stringify(Game)
                var xhr=new XMLHttpRequest()
                var url ="delete"
                xhr.open("POST",url,true)
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange=function (){
                    if(xhr.readyState==XMLHttpRequest.DONE){
                        console.log(xhr.responseText)
                    }
                }
                xhr.send(json)
                location.href = location.href;
                location.replace(location.href);
            })
       })
})