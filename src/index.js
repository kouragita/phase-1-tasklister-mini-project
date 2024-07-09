
// Ensure the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const sortAscBtn = document.getElementById('sort-asc');
  const sortDescBtn = document.getElementById('sort-desc');

  // Add event listener for form submission to handle adding new tasks
  form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      // Get input values
      const taskDescription = document.getElementById('new-task-description').value;
      const taskPriority = document.getElementById('new-task-priority').value;
      const taskUser = document.getElementById('new-task-user').value;
      const taskDuration = document.getElementById('new-task-duration').value;
      const taskDate = document.getElementById('new-task-date').value;

      // Create a new list item element
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
          ${taskDescription} - Priority: ${taskPriority} - User: ${taskUser} - Duration: ${taskDuration} - Due: ${taskDate}
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>
      `;
      taskItem.setAttribute('data-priority', taskPriority); // Set the priority as a data attribute

      // Append the new task item to the task list
      taskList.appendChild(taskItem);

      // Reset the form fields after submission
      form.reset();

      // Add event listener for the delete button to remove the task
      taskItem.querySelector('.delete-btn').addEventListener('click', () => {
          taskList.removeChild(taskItem); // Remove the task item from the list
      });

      // Add event listener for the edit button to edit the task
      taskItem.querySelector('.edit-btn').addEventListener('click', () => {
          const newDescription = prompt("Edit task description:", taskDescription);
          const newUser = prompt("Edit user:", taskUser);
          const newDuration = prompt("Edit duration:", taskDuration);
          const newDate = prompt("Edit date due:", taskDate);

          // Update the task item with the new values
          taskItem.innerHTML = `
              ${newDescription} - Priority: ${taskPriority} - User: ${newUser} - Duration: ${newDuration} - Due: ${newDate}
              <button class="delete-btn">Delete</button>
              <button class="edit-btn">Edit</button>
          `;

          // Re-add event listeners for the updated task item
          taskItem.querySelector('.delete-btn').addEventListener('click', () => {
              taskList.removeChild(taskItem);
          });
          taskItem.querySelector('.edit-btn').addEventListener('click', () => {
              const newDescription = prompt("Edit task description:", newDescription);
              const newUser = prompt("Edit user:", newUser);
              const newDuration = prompt("Edit duration:", newDuration);
              const newDate = prompt("Edit date due:", newDate);

              taskItem.innerHTML = `
                  ${newDescription} - Priority: ${taskPriority} - User: ${newUser} - Duration: ${newDuration} - Due: ${newDate}
                  <button class="delete-btn">Delete</button>
                  <button class="edit-btn">Edit</button>
              `;
          });
      });
  });

  // Sort tasks in ascending order of priority
  sortAscBtn.addEventListener('click', () => {
      const tasks = Array.from(taskList.getElementsByTagName('li')); // Convert HTMLCollection to Array
      tasks.sort((a, b) => a.getAttribute('data-priority') - b.getAttribute('data-priority'));
      tasks.forEach(task => taskList.appendChild(task)); // Append sorted tasks back to the task list
  });

  // Sort tasks in descending order of priority
  sortDescBtn.addEventListener('click', () => {
      const tasks = Array.from(taskList.getElementsByTagName('li'));
      tasks.sort((a, b) => b.getAttribute('data-priority') - a.getAttribute('data-priority'));
      tasks.forEach(task => taskList.appendChild(task));
  });
});
