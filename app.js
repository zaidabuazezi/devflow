let tasksList=document.querySelector("[data-tasks-list]");  
let totalTasks=document.querySelector("[data-total-tasks]");
let completedTasks=document.querySelector("[data-completed-tasks]");
let inprogressTasks=document.querySelector("[data-in-progress-tasks]");
let totalProjects=document.querySelector("[data-total-projects]");
let projectsList=document.querySelector("[data-projects-list]"); 
let todoTasks=document.querySelector("[data-todo-tasks]");
let reviewTasks=document.querySelector("[data-review-tasks]");
let overviewInProgress=document.querySelector("[data-overview-in-progress]");
let overviewCompleted=document.querySelector("[data-overview-completed]");
let chartCompleted=document.querySelector("[data-chart-completed]");
let taskchart=document.querySelector("[data-task-chart]");
let chartPercentage=document.querySelector("[data-chart-percentage]");
let addTaskBtn=document.querySelector("[data-add-task]");
let taskModal=document.querySelector("[data-task-modal]");
let closeTaskModal=document.querySelector("[data-close-task-modal]");
let taskForm=document.querySelector("[data-task-form]");
let deleteModal=document.querySelector("[data-delete-modal]");
let cancelDeleteBtn=document.querySelector("[data-cancel-delete]");
let confirmDeleteBtn=document.querySelector("[data-confirm-delete]");
let taskSubmitBtn=document.querySelector("[data-task-submit]");
let taskProjectSelect=document.querySelector("[data-task-project-select]");
let taskToDeleteId=null;
let taskToEditId=null;


let dashboard=document.querySelector('[data-page="dashboard"]');
let myTasksLink=document.querySelector('[data-page="tasks"]');
let dashboardPage=document.querySelector("[data-dashboard-page]");
let tasksPage=document.querySelector("[data-tasks-page]");
let projectFilter=document.querySelector("[data-project-filter]");
let allTasksList=document.querySelector("[data-all-tasks-list]");
let taskSearch=document.querySelector("[data-task-search]");
let statusFilter=document.querySelector("[data-status-filter]");
let priorityFilter=document.querySelector("[data-priority-filter]");
let clearFilterBtn=document.querySelector("[data-clear-filters]");
let taskSort=document.querySelector("[data-task-sort]");



let projectsLink=document.querySelector('[data-page="projects"]');
let projectsPage=document.querySelector("[data-projects-page]");
let addProjectBtn=document.querySelector("[data-add-project]");
let projectModal=document.querySelector("[data-project-modal]");
let closeProjectModal=document.querySelector("[data-close-project-modal]");
let projectForm=document.querySelector("[data-project-form]");
let allProjectsList=document.querySelector("[data-all-projects-list]");
let createProjectBtn=document.querySelector("[data-create-project-btn]");
let projectToEditId=null;
let projectToDeleteId=null;


let mobileMenuBtn=document.querySelector("[data-mobile-menu]");
let sidebar=document.querySelector("[data-sidebar]");
let closeSidebarBtn=document.querySelector("[data-close-sidebar]");
let sidebarOverlay=document.querySelector("[data-sidebar-overlay]");
let navLinks=document.querySelectorAll(".nav-link");


let savedTasks=localStorage.getItem("devflowTasks");
let savedProjects=JSON.parse(localStorage.getItem("devflowProjects"));

let tasks=
[
    {
        id:1,
        title:"Build Dashboard UI",
        project:"DevFlow Web",
        projectId:1,
        status:"in-progress",
        priority:"high",
        dueDate:"2026-09-20",
    },
    

    {
        id:4,
        title:"Build Dashboard UX",
        project:"DevFlow Web",
        projectId:1,
        status:"in-progress",
        priority:"high",
        dueDate:"2026-09-24",
    },
]


if(savedTasks) {

   tasks=JSON.parse(savedTasks);
}



let projects = 
[
    {
        id:1,
        name:"DevFlow Web",
        description:"Project Management Platform",
        dueDate:"2026-09-28",
        members:["ZA","AM","MK"],
    },

     {
        id:2,
        name:"DevFlow Web",
        description:"Project Management Platform",
        dueDate:"2026-09-30",
        members:["YS","MD","KI"],
    },

]


if(savedProjects) {
    projects=savedProjects;
}



function formatDate(date) {

   let newDate=new Date(date);
   return newDate.toLocaleDateString("en-US", {
     month: "short",
     day:"numeric"
   });
}


function saveTasks() {

  localStorage.setItem("devflowTasks",JSON.stringify(tasks));

}

function saveProjects() {
    localStorage.setItem("devflowProjects",JSON.stringify(projects));
}

function renderTasks() {

    tasksList.innerHTML="";
    totalTasks.textContent=tasks.length;
    totalProjects.textContent=projects.length;

    let completed=tasks.filter((task) => {
       return task.status === "completed";
    });
    completedTasks.textContent=completed.length;
    overviewCompleted.textContent=completed.length;
    chartCompleted.textContent=completed.length;

    let completedPercentage= tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0 ;

     taskchart.style.backgroundImage =
    `conic-gradient(#8b5cf6 0% ${completedPercentage}%, rgba(255,255,255,0.05) ${completedPercentage}% 100%)`;
    
    chartPercentage.textContent=`${Math.round(completedPercentage)}% Completed `;

     let inProgress=tasks.filter((task) => {
        return task.status === "in-progress";
     });

     inprogressTasks.textContent=inProgress.length;
     overviewInProgress.textContent=inProgress.length;

     let todo=tasks.filter((task) => {
        return task.status === "todo";
     });

     todoTasks.textContent=todo.length;     

     let review=tasks.filter((task) => {
        return task.status === "review";
     });

     reviewTasks.textContent=review.length;   
     

    tasks.forEach((task) => {
       let taskElement=document.createElement("div");
       taskElement.className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-white/10 bg-black/10 p-4";
       let priorityClass="";
       
       if(task.priority === "high") {
        priorityClass="bg-red-500/10 text-red-400";
       }
       else if(task.priority === "medium") {
        priorityClass="bg-amber-500/10 text-amber-400";
       }
       else if(task.priority === "low") {
        priorityClass="bg-emerald-500/10 text-emerald-400";
       }

       let priorityText=task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

       let isCompleted=task.status === "completed";

       taskElement.innerHTML=`
        <div class="flex items-center gap-3">
                        <button type="button" data-task-id="${task.id}" class="flex size-5 items-center justify-center rounded-full
                         border cursor-pointer transition ${isCompleted ? "border-violet-500 bg-violet-500" 
                            : "border-gray-600" }" >
                        ${isCompleted ? '<i class="ri-check-line text-xs text-white"></i>': "" }
                        </button>
                         <div>
                            <h4 class="text-sm font-medium ${isCompleted ? "text-gray-500 line-through" :"text-white"}">${task.title}</h4>
                            <p class="mt-1 text-xs text-gray-500">${task.project}</p>
                         </div>
                    </div>

                     <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="ri-calendar-line"></i>
                        <span>${formatDate(task.dueDate)}</span>
                     </div>

                     <div class="flex items-center gap-2">
                         <span class="rounded-md px-2.5 py-1 text-xs font-medium ${priorityClass}">${priorityText}</span>
                         <button class="flex items-center justify-center size-8 rounded-lg text-gray-500 transition
                          hover:bg-violet-500/10 hover:text-violet-400 cursor-pointer" data-edit-task="${task.id}">
                          <i class="ri-edit-line"></i>
                         </button>
                         <button type="button" class="flex size-8 items-center justify-center rounded-lg text-gray-500
                          transition hover:bg-red-500/10 hover:text-red-400 cursor-pointer" data-delete-task=${task.id}>
                             <i class="ri-delete-bin-line"></i>
                         </button>
                     </div>

       `;
       tasksList.appendChild(taskElement);
    });
}


function renderAllTasks(tasksToRender = tasks) {

  allTasksList.innerHTML="";

    if(tasksToRender.length === 0) {
        allTasksList.innerHTML=`
        <div class="text-center py-16">
           <i class="ri-search-line text-3xl text-gray-600"></i>
           <h3 class="mt-3 font-medium text-gray-300">No Tasks found</h3>
           <p class="mt-1 text-sm text-gray-500">Try changing your search or filters</p>
        </div>
        `;
        return;
    }

  tasksToRender.forEach((task) => {
   let taskElementt=document.createElement("div");
   taskElementt.className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-white/10 bg-white/5 p-4";
   let isCompleted=task.status === "completed";
   let statusText="";
   if(task.status === "todo") {
    statusText="To Do";
   }
   else if(task.status === "in-progress") {
    statusText="In Progress";
   }
   else if(task.status === "review") {
    statusText="In Review";
   }
   else if(task.status === "completed") {
    statusText="Completed";
   }
   

   let priorityClass="";

      if(task.priority === "high") {
         priorityClass="bg-red-500/10 text-red-400 "
      }
       else if(task.priority === "medium") {
        priorityClass="bg-amber-500/10 text-amber-400";
       }
       else if(task.priority === "low") {
        priorityClass="bg-emerald-500/10 text-emerald-400";
       }
  

     let priorityText=task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

   taskElementt.innerHTML=`
     <div class="flex items-center gap-3">
     <button type="button" class="flex size-5 items-center justify-center rounded-full border cursor-pointer transition
      ${isCompleted ? "border-violet-500 bg-violet-500" : "border-gray-600"} "data-all-task-id="${task.id}">
        ${isCompleted ? '<i class="ri-check-line text-xs text-white"></i>' : ""}
     </button>

      <div>
        <h4 class="text-sm font-medium ${isCompleted ? "line-through text-gray-500" : "text-white"}">${task.title}</h4>
        <p class="mt-1 text-xs text-gray-500">${task.project}</p>
      </div>

     </div>

     <div class="flex flex-wrap items-center gap-2 sm:gap-4">

          <div class="flex items-center gap-2 text-xs text-gray-500">
           <i class="ri-calendar-line"></i>
           <span>${formatDate(task.dueDate)}</span>
          </div>

         <span class="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">${statusText}</span>
         <span class="rounded-md px-2.5 py-1 text-xs font-medium ${priorityClass}">${priorityText}</span>
         <button type="button" class="flex size-8 rounded-lg cursor-pointer flex items-center justify-center text-gray-500 transition hover:bg-violet-500
          hover:text-violet-400" data-all-edit-task="${task.id}">
         <i class="ri-edit-line"></i>
         </button>
         <button type="button" class="flex size-8 rounded-lg cursor-pointer flex items-center justify-center text-gray-500 transition hover:bg-red-500/10
          hover:text-red-400" data-all-delete-task="${task.id}">
         <i class="ri-delete-bin-line"></i>
         </button>

     </div>
   `;
 
      allTasksList.appendChild(taskElementt); 

  }); 

}


function renderProjects() {

    projectsList.innerHTML="";


    projects.forEach((project) => {
       let projectElement=document.createElement("div");
       projectElement.className="mt-5 rounded-xl border border-white/10 bg-black/10 p-4";

       let projectTasks=tasks.filter((task) => {
      return task.projectId === project.id;
    });

    let completedProjectTasks=projectTasks.filter((task) => {
      return task.status === "completed";
    });

    let projectProgress= projectTasks.length > 0 ? Math.round((completedProjectTasks.length / projectTasks.length) * 100) : 0;

      let memberHTML=project.members.map((member) => {

        return `<div class="flex size-7 items-center justify-center rounded-full border-2 border-[#151A24] bg-violet-500
                     text-[10px] font-semibold">
                    ${member}
                </div>
        `;
      }).join("");
    
       projectElement.innerHTML=`
         <!-- Project Info -->
            <div class="flex items-start justify-between">

                <div>
                    <div class="flex items-center gap-2">
                        <span class="size-2.5 rounded-full bg-violet-500"></span>

                        <h4 class="font-medium">
                            ${project.name}
                        </h4>
                    </div>

                    <p class="mt-1 text-xs text-gray-500">
                        ${project.description}
                    </p>
                </div>

            </div>


             <!-- Progress -->
            <div class="mt-5">

                <div class="mb-2 flex items-center justify-between text-xs">
                    <span class="text-gray-500">
                        Progress
                    </span>

                    <span class="font-medium text-gray-300">
                        ${projectProgress}%
                    </span>
                </div>

                <div class="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div class="h-full rounded-full bg-violet-500" style="width:${projectProgress}%"></div>
                </div>

            </div>


            <!-- Tasks + Date -->
            <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-4">

                <div class="flex items-center gap-4 text-xs text-gray-500">

                    <div class="flex items-center gap-1.5">
                        <i class="ri-task-line"></i>
                        <span>${projectTasks.length} Tasks</span>
                    </div>

                    <div class="flex items-center gap-1.5">
                        <i class="ri-calendar-line"></i>
                        <span>${formatDate(project.dueDate)}</span>
                    </div>

                </div>

                <div class="flex -space-x-2">
                  ${memberHTML}

                </div>

            </div>
       `;
       projectsList.appendChild(projectElement);

    });

}


function renderAllProjects() {
    allProjectsList.innerHTML="";


    projects.forEach((project) => {
      
       let projectCard=document.createElement("div");
       projectCard.className="rounded-xl border border-white/10 bg-white/5 p-5";


      let projectTasks=tasks.filter((task) => {
         return task.projectId === project.id;
      });

      let completedProjectTasks=projectTasks.filter((task) => {
        return task.status === "completed";
      });
    
      let projectProgress= projectTasks.length > 0 ? Math.round((completedProjectTasks.length / projectTasks.length) *100) : 0 ;

       projectCard.innerHTML=`
         <div>
            
           <div class="flex items-start justify-between">
           <div>
           <h3 class="font-semibold text-white">${project.name}</h3>
           <p class="mt-1 text-sm text-gray-500">${project.description}</p>
           </div>
            
           <div class="relative">
           <button type="button" class="cursor-pointer text-gray-500 transition hover:text-white"
            data-project-menu="${project.id}">
            <i class="ri-more-2-fill text-lg"></i>
           </button>

            <div class="absolute right-0 top-7 z-20 hidden w-32 rounded-lg border border-white/10 bg-[#1A202C]
              p-1 shadow-lg" data-project-dropdown="${project.id}">
               
              <button type="button" class="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2
               text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
               data-edit-project="${project.id}">
               <i class="ri-edit-line"></i>
               Edit
              </button>

              <button type="button" class="w-full flex items-center cursor-pointer gap-2 rounded-md px-3 py-2
                text-left text-sm text-red-400 transition hover:bg-red-500/10" data-delete-project="${project.id}">
               <i class="ri-delete-bin-line"></i>
               Delete
              </button>

            </div>

           </div>

           </div>

           <div class="mt-4">
               <div class="flex items-center justify-between text-xs mb-2">
                 <span class="text-gray-500">Progress</span>
                 <span class="font-medium text-gray-300">${projectProgress}%</span>
               </div>
           </div>

           <div class="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div class="h-full rounded-full bg-violet-500" style="width:${projectProgress}%">
            </div>
           </div>

           <div class="mt-4 flex items-center gap-4 text-xs text-gray-500">

           <div class="flex items-center gap-1.5 text-xs text-gray-500">
             <i class="ri-calendar-line"></i>
             <span>${formatDate(project.dueDate)}</span>
           </div>

           <div class="flex items-center gap-1.5 text-xs text-gray-500">
             <i class="ri-task-line"></i>
             <span>${projectTasks.length} Tasks</span>
           </div>

           </div>

         </div>

       `;
       allProjectsList.appendChild(projectCard);
    });
}


renderTasks();
renderProjects();
renderAllTasks();
renderAllProjects();



allProjectsList.addEventListener("click",(e) => {
 
let menuBtn=e.target.closest("[data-project-menu]");
let editProjectList=e.target.closest("[data-edit-project]");
let deleteProjectList=e.target.closest("[data-delete-project]");

    if(editProjectList) {
        let projectIdEdit=Number(editProjectList.dataset.editProject);
        projectToEditId=projectIdEdit;

        let projectToEdit=projects.find((project) => {
           return project.id === projectIdEdit;
        });
        if(!projectToEdit) {
            return;
        }
        projectForm.reset();
        projectModal.classList.remove("hidden");
        projectModal.classList.add("flex");

          createProjectBtn.innerHTML=`
          <i class="ri-edit-line mr-1"></i>
                save Changes
          `;

       projectForm.elements.name.value=projectToEdit.name;
       projectForm.elements.description.value=projectToEdit.description;
       projectForm.elements.dueDate.value=projectToEdit.dueDate;

       return;
    }


    if(deleteProjectList) {
        let projectIdDelete=Number(deleteProjectList.dataset.deleteProject);
        projectToDeleteId=projectIdDelete;
        deleteModal.classList.remove("hidden");
        deleteModal.classList.add("flex");
        return;
    }

if(!menuBtn) {
    return;
}
let projectId=Number(menuBtn.dataset.projectMenu);

let dropdown=allProjectsList.querySelector(`[data-project-dropdown="${projectId}"]`);
 
dropdown.classList.toggle("hidden");

});


tasksList.addEventListener("click",(e) => {

  let button=e.target.closest("[data-task-id]");
  let deleteBtn=e.target.closest("[data-delete-task]");
  let editBtn=e.target.closest("[data-edit-task]");

   if(deleteBtn) {
     taskToDeleteId = Number(deleteBtn.dataset.deleteTask);
     deleteModal.classList.remove("hidden");
     deleteModal.classList.add("flex");
     return; // work finish
  }

  if(editBtn) {
    let taskIdEdit=Number(editBtn.dataset.editTask);
    taskToEditId=taskIdEdit;

    let taskToEdit=tasks.find((task) => {
         return task.id === taskIdEdit;
    });

    if(!taskToEdit) {
        return;
    }
    taskForm.reset();
    taskModal.classList.remove("hidden");
    taskModal.classList.add("flex");
    taskSubmitBtn.innerHTML=`
    <i class="ri-save-line mr-1"></i>
      Save Changes
    `;

    taskForm.elements.title.value=taskToEdit.title;
    taskForm.elements.project.value=taskToEdit.projectId;
    taskForm.elements.status.value=taskToEdit.status;
    taskForm.elements.priority.value=taskToEdit.priority;
    taskForm.elements.dueDate.value=taskToEdit.dueDate;
   return;
  }

  if(!button) {
    return;
  }

  let taskId=Number(button.dataset.taskId);

  let selectedTask=tasks.find((task) => {
    return task.id === taskId;
  });
  if(!selectedTask) {
    return;
  }

   
    if(selectedTask.status === "completed") {
        selectedTask.status = selectedTask.previousStatus || "todo";
    }
    else 
    {
        selectedTask.previousStatus = selectedTask.status;
        selectedTask.status = "completed";
    }

  saveTasks();
  renderTasks();
  renderProjects();
 renderAllTasks();

});


allTasksList.addEventListener("click",(e) => {
 
   let button=e.target.closest("[data-all-task-id]");
   let editBtn=e.target.closest("[data-all-edit-task]");
   let deleteBtn=e.target.closest("[data-all-delete-task]");

    if(editBtn) {
    let taskIdEdit=Number(editBtn.dataset.allEditTask);
    taskToEditId=taskIdEdit;

    let taskToEdit=tasks.find((task) => {
      return task.id === taskIdEdit;
    });

    if(!taskToEdit) {
        return;
    }

     taskModal.classList.remove("hidden");
     taskModal.classList.add("flex");

     taskSubmitBtn.innerHTML=`
    <i class="ri-save-line mr-1"></i>
      Save Changes
    `;

    taskForm.elements.title.value=taskToEdit.title;
    taskForm.elements.project.value=taskToEdit.projectId;
    taskForm.elements.status.value=taskToEdit.status;
    taskForm.elements.priority.value=taskToEdit.priority;
    taskForm.elements.dueDate.value=taskToEdit.dueDate;

    return;
   }


   if(deleteBtn) {
        let taskIdDelete=Number(deleteBtn.dataset.allDeleteTask);
        taskToDeleteId=taskIdDelete;

        deleteModal.classList.remove("hidden");
        deleteModal.classList.add("flex");
        return;
    }


   if(!button) {
    return;
   }
 
   let taskId=Number(button.dataset.allTaskId);
   let selectedTask=tasks.find((task) => {
     return task.id === taskId;
   });

   if(!selectedTask) {
    return;
   }

    if(selectedTask.status === "completed") {
        selectedTask.status=selectedTask.previousStatus || "todo";
    }
    else {
        selectedTask.previousStatus=selectedTask.status;
        selectedTask.status="completed";
    }

    saveTasks();
    renderTasks();
    applyTaskFilters();
    renderAllProjects();
});

cancelDeleteBtn.addEventListener("click",() => {
   
   deleteModal.classList.remove("flex");
   deleteModal.classList.add("hidden");
   taskToDeleteId=null;   
   projectToDeleteId=null;
});


confirmDeleteBtn.addEventListener("click",() => {
  
    if(taskToDeleteId === null && projectToDeleteId === null) {
        return;
    } 

 
    if(taskToDeleteId !== null) {

     let taskIndex=tasks.findIndex((task) => {
        return task.id === taskToDeleteId;
    });

   if (taskIndex === -1) {
    return;
   }

   tasks.splice(taskIndex,1);
   saveTasks();
   renderTasks();
   renderProjects();
   applyTaskFilters();


   deleteModal.classList.remove("flex");
   deleteModal.classList.add("hidden");
   taskToDeleteId = null;
 }

    if(projectToDeleteId !== null) {

    let projectIndex=projects.findIndex((project) => {
      return project.id === projectToDeleteId;
    });

    if(projectIndex === -1) {
        return;
    }


     let projectTasks=tasks.filter((task) => {
       return task.projectId === projectToDeleteId;
     });

     if(projectTasks.length > 0 ) {
        alert("You can't delete this project because it has tasks.");
        deleteModal.classList.remove("flex");
        deleteModal.classList.add("hidden");
        projectToDeleteId=null;
        return;
     }

    projects.splice(projectIndex,1);

    saveProjects();
    renderAllProjects();
    renderProjects();
    renderTasks();
    renderTaskProjectOptions();
    renderProjectFilterOptions();
    applyTaskFilters();
     projectToDeleteId=null;
     deleteModal.classList.remove("flex");
     deleteModal.classList.add("hidden");
    }   

});


addTaskBtn.addEventListener("click",() => {

  taskToEditId=null;
  taskForm.reset();
  taskModal.classList.remove("hidden");
  taskModal.classList.add("flex");

   taskSubmitBtn.innerHTML=`
    <i class="ri-add-line mr-1"></i>
      Create Task
    `;

});

closeTaskModal.addEventListener("click",() => {

    taskModal.classList.remove("flex");
  taskModal.classList.add("hidden");
  taskToEditId=null;
  taskForm.reset();

});


taskForm.addEventListener("submit",(e) => {
 
    e.preventDefault();
    let formData=new FormData(taskForm);
    let title= formData.get("title");
    let projectId=Number(formData.get("project"));
    let status=formData.get("status");
    let priority=formData.get("priority");
    let dueDate=formData.get("dueDate");


    let selectedProject=projects.find((p) => {
      return p.id === projectId;
    });

    if(!selectedProject) {
        return;
    }


    if(taskToEditId !== null) {  //update
       let taskToUpdate=tasks.find((task) => {
           return task.id === taskToEditId;
       });

        if(!taskToUpdate) {
            return;
        }

        

        taskToUpdate.title=title;
        taskToUpdate.project=selectedProject.name;
        taskToUpdate.projectId=selectedProject.id;
        taskToUpdate.status=status;
        taskToUpdate.priority=priority;
        taskToUpdate.dueDate=dueDate;

        saveTasks();
        renderTasks();
        renderProjects();
        applyTaskFilters();
        taskToEditId=null;
        taskModal.classList.remove("flex");
        taskModal.classList.add("hidden");
        return;
    }

    let newTask= {
        id:Date.now(),
        title:title,
        project:selectedProject.name,
        projectId:selectedProject.id,
        status:status,
        priority:priority,
        dueDate:dueDate
    } 

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    renderProjects();
    applyTaskFilters();

    taskForm.reset();

    taskModal.classList.add("hidden");
    taskModal.classList.remove("flex");


});

taskModal.addEventListener("click",(e) => {

   if(e.target === taskModal) {
    taskModal.classList.remove("flex");
    taskModal.classList.add("hidden");
    taskToEditId=null;
    taskForm.reset();
   }

});


document.addEventListener("keydown",(e) => {
 
  if(e.key === "Escape") {
    taskModal.classList.remove("flex");
    taskModal.classList.add("hidden");
    taskToEditId=null;
    taskForm.reset();


    deleteModal.classList.remove("flex");
    deleteModal.classList.add("hidden");
    taskToDeleteId=null;
    projectToDeleteId=null;


     projectModal.classList.remove("flex");
     projectModal.classList.add("hidden");
     projectToEditId=null;
     projectForm.reset();

  }

});

deleteModal.addEventListener("click",(e) => {

  if(e.target === deleteModal) {
    deleteModal.classList.remove("flex");
    deleteModal.classList.add("hidden");
    taskToDeleteId=null;
    projectToDeleteId=null;
  }

});




myTasksLink.addEventListener("click",(e) => {
 
     e.preventDefault(); 

     removeActiveNav();
     myTasksLink.classList.add("bg-violet-500/15","text-violet-300","active");

    dashboardPage.classList.add("hidden");
    projectsPage.classList.add("hidden");
    tasksPage.classList.remove("hidden");
    sidebar.classList.add("hidden");
    sidebarOverlay.classList.add("hidden"); 
});


dashboard.addEventListener("click",(e) => {

  e.preventDefault();
   
   removeActiveNav();

   dashboard.classList.add("bg-violet-500/15","text-violet-300","active");

  dashboardPage.classList.remove("hidden");
  tasksPage.classList.add("hidden");
  projectsPage.classList.add("hidden");
  sidebar.classList.add("hidden"); 
  sidebarOverlay.classList.add("hidden");
});

function renderProjectFilterOptions() {


  let currentProject=projectFilter.value;
  projectFilter.innerHTML=`
    <option value="all">All Projects</option>
  `;
  projects.forEach((project) => {

  let option=document.createElement("option");
   option.value=project.id;
   option.textContent=project.name;
    projectFilter.appendChild(option);   

});

   projectFilter.value=projects.some((project) => {
          return project.id === Number(currentProject);
   }) ? currentProject : "all";

}

renderProjectFilterOptions();

function renderTaskProjectOptions() {

   taskProjectSelect.innerHTML="";
   projects.forEach((project) => {

    let option=document.createElement("option");
    option.value=project.id;
    option.textContent=project.name;

    taskProjectSelect.appendChild(option);
   });


}

renderTaskProjectOptions();


function applyTaskFilters() {
 
    let searchTerm=taskSearch.value.toLowerCase().trim();
    let selectedProject=projectFilter.value;
    let selectedStatus=statusFilter.value;
    let selectedPriority=priorityFilter.value;
    let selectedSort=taskSort.value;
    let filteredTasks=tasks;

    if(searchTerm !== "") {

        filteredTasks=filteredTasks.filter((task) => {
             return task.title.toLowerCase().includes(searchTerm) ||
                    task.project.toLowerCase().includes(searchTerm); 
        });
    }

    if(selectedProject !== "all") {
         filteredTasks=filteredTasks.filter((task) => {
           return task.projectId === Number(selectedProject);
         });
    }

    if(selectedStatus !== "all") {
        filteredTasks=filteredTasks.filter((task) => {
            return task.status === selectedStatus;
        });
    }

    if(selectedPriority !== "all") {
        filteredTasks=filteredTasks.filter((task) => {
           return task.priority === selectedPriority;
        });
    }

    if(selectedSort === "newest") {
        filteredTasks=[...filteredTasks].sort((a,b) => {
            return b.id - a.id;
        });

    }

    if(selectedSort === "due-date") {
        filteredTasks=[...filteredTasks].sort((a,b) => {
           return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    if(selectedSort === "priority") {

        let priorityOrder= {
            low:1,
            medium:2,
            high:3
        }
         
    filteredTasks=[...filteredTasks].sort((a,b) => {
     
    return priorityOrder[b.priority] - priorityOrder[a.priority];
       
    });
    
    }

    renderAllTasks(filteredTasks);
}


taskSearch.addEventListener("input",() => {

   applyTaskFilters();
     
});


projectFilter.addEventListener("change",() => {

    applyTaskFilters();

});


statusFilter.addEventListener("change",() => {
   
    applyTaskFilters();

});


priorityFilter.addEventListener("change",() => {
   
   applyTaskFilters();

});


taskSort.addEventListener("change",() => {
  
   applyTaskFilters();

});

clearFilterBtn.addEventListener("click",() => {

    taskSearch.value="";
    projectFilter.value="all";
    statusFilter.value="all";
    priorityFilter.value="all";
    taskSort.value="default";
  
    applyTaskFilters();

});




projectsLink.addEventListener("click",(e) => {


    e.preventDefault();

     removeActiveNav();

     projectsLink.classList.add("bg-violet-500/15","text-violet-300","active");

     dashboardPage.classList.add("hidden");
     tasksPage.classList.add("hidden");
     projectsPage.classList.remove("hidden");
     sidebar.classList.add("hidden"); 
     sidebarOverlay.classList.add("hidden");

     renderAllProjects();
});


addProjectBtn.addEventListener("click",() => {
 
    projectToEditId=null;
    projectForm.reset();
     projectModal.classList.remove("hidden");
     projectModal.classList.add("flex");
      
    createProjectBtn.innerHTML=`
          <i class="ri-add-line mr-1"></i>
        Create New Project 
    `;

});

closeProjectModal.addEventListener("click",() => {
 
    projectModal.classList.remove("flex");
     projectModal.classList.add("hidden"); 
     projectToEditId=null;
     projectForm.reset();

});


projectModal.addEventListener("click",(e) => {

    if(e.target === projectModal) {
    projectModal.classList.remove("flex");
     projectModal.classList.add("hidden");
     projectToEditId=null;
     projectForm.reset();
    }

});


projectForm.addEventListener("submit",(e) => {

    e.preventDefault();
    let projectName=projectForm.elements.name.value.trim();
    let projectDescription=projectForm.elements.description.value.trim();
    let projectDueDate=projectForm.elements.dueDate.value.trim();


    if(projectToEditId !==null) {
      let projectToEdit=projects.find((project) => {
         return project.id === projectToEditId;
      });

      if(!projectToEdit) {
        return;
      }

       projectToEdit.name=projectName;
       projectToEdit.description=projectDescription;
       projectToEdit.dueDate=projectDueDate;


       tasks.forEach((task) => {
           if(task.projectId === projectToEditId) {
              task.project = projectName;
           }

       });

        saveTasks();
        saveProjects();

       renderTasks();
       applyTaskFilters();
       renderProjects();
       renderAllProjects();
       renderTaskProjectOptions();
       renderProjectFilterOptions();

    projectForm.reset();
    projectModal.classList.remove("flex");
    projectModal.classList.add("hidden"); 
    projectToEditId=null;
     return;

    }
    
    let newProject= {
        id:Date.now(),
        name:projectName,
        description:projectDescription,
        dueDate:projectDueDate,
        members:[]
    }

     projects.push(newProject);
     saveProjects();
     renderTaskProjectOptions();
     renderProjectFilterOptions();
     renderTasks();
     renderProjects();
     renderAllProjects();

    projectForm.reset();
    projectModal.classList.remove("flex");
    projectModal.classList.add("hidden");

});


mobileMenuBtn.addEventListener("click",() => {

   sidebar.classList.remove("hidden"); 
   sidebarOverlay.classList.remove("hidden");
});

closeSidebarBtn.addEventListener("click",() => {

   sidebar.classList.add("hidden"); 
   sidebarOverlay.classList.add("hidden");

});


sidebarOverlay.addEventListener("click",(e) => {

  if(e.target === sidebarOverlay) {
     sidebar.classList.add("hidden"); 
   sidebarOverlay.classList.add("hidden");
  }

});


function removeActiveNav() {
 
 navLinks.forEach((navlink) => {
    navlink.classList.remove("bg-violet-500/15", "text-violet-300","active");

}); 

}