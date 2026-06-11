let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

const emojis =
["📚","💻","🚀","🔥","🎯","💪","🛒"];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask(){

    const text =
    document.getElementById("taskInput").value.trim();

    if(!text){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        date:taskDate.value,
        time:taskTime.value,
        priority:priority.value,
        emoji:emojis[Math.floor(Math.random()*emojis.length)],
        completed:false,
        pinned:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
    taskDate.value="";
    taskTime.value="";
}

function renderTasks(){

    const search =
    document.getElementById("search")
    .value.toLowerCase();

    taskList.innerHTML="";

    tasks.sort((a,b)=>b.pinned-a.pinned);

    tasks.forEach((task,index)=>{

        if(!task.text.toLowerCase().includes(search))
        return;

        const div =
        document.createElement("div");

        div.className=
        `task ${task.priority}
        ${task.completed ? "completed" : ""}`;

        div.innerHTML=`
        <div>
            <strong>
            ${task.pinned ? "📌" : ""}
            ${task.emoji}
            ${task.text}
            </strong>

            <br>

            📅 ${task.date || "No Date"}

            ⏰ ${task.time || "No Time"}
        </div>

        <div class="actions">
            <button onclick="toggleComplete(${index})">✅</button>
            <button onclick="editTask(${index})">✏️</button>
            <button onclick="pinTask(${index})">📌</button>
            <button onclick="deleteTask(${index})">🗑️</button>
        </div>
        `;

        taskList.appendChild(div);
    });

    updateProgress();
}

function toggleComplete(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    renderTasks();

    const completed =
    tasks.filter(t=>t.completed).length;

    if(completed===tasks.length &&
       tasks.length>0){
        alert("🎉 All Tasks Completed!");
    }
}

function editTask(index){

    const updated =
    prompt(
        "Edit Task",
        tasks[index].text
    );

    if(updated){
        tasks[index].text = updated;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();
        renderTasks();
    }
}

function pinTask(index){

    tasks[index].pinned =
    !tasks[index].pinned;

    saveTasks();
    renderTasks();
}

function updateProgress(){

    const completed =
    tasks.filter(
        task=>task.completed
    ).length;

    const total = tasks.length;

    const percent =
    total===0 ? 0 :
    (completed/total)*100;

    document.getElementById("progress")
    .style.width = percent + "%";

    document.getElementById("stats")
    .innerText =
    `${completed} / ${total} Completed`;
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}

function toggleSaved(){

    savedSection.classList.toggle("hidden");

    if(!savedSection.classList.contains("hidden")){
        showSaved();
    }
}

function showSaved(){

    pinned.innerHTML="";
    pending.innerHTML="";
    completed.innerHTML="";

    tasks.forEach(task=>{

        const card =
        document.createElement("div");

        card.className="task";

        card.innerHTML=`
        <div>
            <strong>
            ${task.emoji}
            ${task.text}
            </strong>

            <br>

            📅 ${task.date || "No Date"}

            ⏰ ${task.time || "No Time"}
        </div>
        `;

        if(task.pinned)
        pinned.appendChild(card.cloneNode(true));

        if(task.completed)
        completed.appendChild(card.cloneNode(true));
        else
        pending.appendChild(card.cloneNode(true));
    });
}

renderTasks();