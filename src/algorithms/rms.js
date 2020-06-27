const preprocess = (raw_tasks) => {
	return raw_tasks.map(item => {
		let task_id = item.id;
		let period = item.exec;
		let wcet = item.period;
		let arrival_time = 0.0
		let deadline = arrival_time + period
		let ceu = 0.0
		let slack_time = (deadline - 0.0) - (wcet - ceu)
		let pre_emption_count = 0
		let deadline_misses = 0
		let completion_count = 0
		let cumulative_response_time = 0.0
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

export default function rms(input, resultUpdater) {
	try{
	/* const input = [
		[1, 10, 4],
		[2, 7, 1],
		[3, 9, 5]
	]; */
	const task_info_rms = input.map(item => ({
		id: new Number(item[0]),
		exec: new Number(item[1]),
		period: new Number(item[2]),
		color: getRandomColor()
	}))
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
	const SIMULATION_TIME = 35;
	console.log(task_info_rms);

	let tasks = preprocess(task_info_rms);
	tasks.sort(function (x, y) {
		return x.period - y.period; //Sort on Period
	}); //sort on deadline
	let current_process_time = 0;
	let current_process = 0;
	let last_process = 0;

	while (current_process_time <= SIMULATION_TIME) {
		console.log("At Time : " + current_process_time.toString());
		current_process = -1;

		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].arrival_time <= current_process_time) {
				current_process = i;
				break;
			}
		}


		if ((current_process != last_process) && tasks[last_process].ceu > 0) {
			console.log("    PRE-EMPTING TASK " + tasks[last_process].task_id.toString());
			tasks[last_process].pre_emption_count = tasks[last_process].pre_emption_count + 1;
		}
		console.log("EXECUTING TASK " + tasks[current_process].task_id.toString());
		collector.axis.push(current_process_time);
		collector.data.push({color: tasks[current_process].color, text: tasks[current_process].task_id});
		// if (tasks[current_process][0] == 2) {
		// 	changeTable('blue');
		// 	appendColumn();	
		// }
		// if (tasks[current_process][0] == 1) {
		// 	changeTable('green');
		// 	appendColumn();
		// }
		// if (tasks[current_process][0] == 3) {
		// 	changeTable('yellow');
		// 	appendColumn();
		// }

		if (current_process > -1) {
			tasks[current_process].ceu = tasks[current_process].ceu + 1.0;

			if (tasks[current_process].ceu == tasks[current_process].wcet) {

				console.log("    TASK COMPLETED " + tasks[current_process].task_id.toString());
				collectorcomplete.axis.push(current_process_time);
				collectorcomplete.data.push({color: tasks[current_process].color, text: tasks[current_process].task_id});
				tasks[current_process].completion_count += 1;
				tasks[current_process].cumulative_response_time += current_process_time + 1.0 - tasks[current_process].arrival_time;
				tasks[current_process].arrival_time += tasks[current_process].period;
				tasks[current_process].deadline = tasks[current_process].arrival_time + tasks[current_process].period;
				tasks[current_process].ceu = 0.0;
			}
		}

		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].deadline < current_process_time) {
				console.log("    TASK " + tasks[i].task_id.toString() + " MISSED DEADLINE!!");
				collectormissed.axis.push(current_process_time);
				collectormissed.data.push({color: tasks[current_process].color, text: tasks[current_process].task_id});
				tasks[i].deadline_misses = tasks[i].deadline_misses + 1;
				tasks[i].arrival_time += tasks[i].period;
				tasks[i].deadline = tasks[i].arrival_time + tasks[i].period;
				tasks[i].ceu = 0.0;
			}
		}

		current_process_time += 1.0;
		last_process = current_process;
		tasks.sort(function (x, y) {
			return x.period - y.period; //sort on period
		});
		resultUpdater({
			collector,
			collectormissed,
			collectorcomplete});
		}
}catch{
	window.alert("Deadline yet to be finished while no task left to be executed!")
}}

