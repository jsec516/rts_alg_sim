const preprocess = (raw_tasks) => {
	return raw_tasks.map(item => {
		let task_id = item.id;
		let period = item.period;
		let wcet = item.exec;
		let arrival_time = 0
		let deadline = item.deadline;
		let ceu = 0
		let slack_time = deadline - 0 - ceu
		let pre_emption_count = 0
		let deadline_misses = 0
		let completion_count = 0
		let cumulative_response_time = 0
		let temp_list = {task_id, period, wcet, arrival_time, deadline, slack_time, ceu, pre_emption_count, deadline_misses, completion_count, cumulative_response_time, color: item.color};
		return temp_list;
	})
	
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

export default function lst(input, simulationTime, resultUpdater) {
	try{
		// const inputNew = [
		// 	[1,7,3,20],
		// 	[2,4,2,5],
		// 	[3,8,2,10]
		// ]
	const task_info_lst = input.map(item => ({
		id: new Number(item[0]),
		deadline: new Number(item[1]),
		exec: new Number(item[2]),
		period: new Number(item[3]),
		color: getRandomColor()
	}))
	console.log(task_info_lst);
	let collector = {
		axis: [],
		data: []
	};
	let collectormissed = {
		axis: [],
		data: []
	};
	let collectorcomplete = {
		axis: [],
		data: []
	};
	const SIMULATION_TIME = new Number(simulationTime);
	console.log(task_info_lst);

	let tasks = preprocess(task_info_lst);
	let current_process_time = 0;
	let current_process = 0;
	let last_process = 0;

	while (current_process_time < SIMULATION_TIME) {
		console.log("At Time : " + current_process_time.toString());
		current_process = -1;

		tasks = tasks.map(task => {
			let slack_time = (task.deadline - current_process_time) - (task.wcet - task.ceu)
			return {
				...task,
				slack_time
			}
		});
		tasks.sort(function (x, y) {
			return x.slack_time - y.slack_time; //sort on slack time
		});

		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].arrival_time <= current_process_time) {

				console.log(`Slack time ${tasks[i].slack_time} = ${tasks[i].deadline}(deadline) - ${current_process_time}(current_process_time) - ${tasks[i].wcet}(task.exec) - ${tasks[i].ceu}(task.ceu) `);
				console.log(`Arrival time ${tasks[i].arrival_time}`)
				current_process = i;
				break;
			}
		}

		collector.axis.push(current_process_time);
		if(tasks[current_process]) {
			//console.log("EXECUTING TASK " + tasks[current_process].task_id.toString());
			collector.data.push({color: tasks[current_process].color, text: tasks[current_process].task_id});
		} else {
			//console.log("IDLE TIME ");
			collector.data.push({color: "#fff", text: "NA"});
		}

		if (current_process > -1) {
			tasks[current_process].ceu = tasks[current_process].ceu + 1;

			if (tasks[current_process].ceu == tasks[current_process].wcet) {

				console.log("    TASK COMPLETED " + tasks[current_process].task_id.toString());
				collectorcomplete.axis.push(current_process_time);
				collectorcomplete.data.push({color: tasks[current_process].color, text: tasks[current_process].task_id});
				tasks[current_process].completion_count += 1;
				tasks[current_process].cumulative_response_time += current_process_time + 1 - tasks[current_process].arrival_time;
				tasks[current_process].arrival_time += tasks[current_process].period;
				tasks[current_process].deadline = tasks[current_process].arrival_time + tasks[current_process].period;
				tasks[current_process].ceu = 0;
			}
		}

		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].deadline < current_process_time) {
				//console.log("    TASK " + tasks[i].task_id.toString() + " MISSED DEADLINE!!");
				collectormissed.axis.push(current_process_time);
				collectormissed.data.push({color: tasks[i].color, text: tasks[i].task_id});
				tasks[i].deadline_misses = tasks[i].deadline_misses + 1;
				tasks[i].arrival_time += tasks[i].period;
				tasks[i].deadline = tasks[i].arrival_time + tasks[i].period;
				tasks[i].ceu = 0;
			}
		}

		current_process_time += 1;
		last_process = current_process;
	}
	resultUpdater({
		collector,
		collectormissed,
		collectorcomplete});
}
catch{
	window.alert("Deadline yet to be finished while no task left to be executed!")
}}
