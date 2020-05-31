export default function edf(task_info_edf_raw) {
	const task_info_edf = task_info_edf_raw.map(item => [new Number(item.taskId), new Number(item.exec), new Number(item.deadline)])
	const SIMULATION_TIME = 35;

	console.log("EDF Scheduler");
	console.log(task_info_edf);

	var task = [];

	for (var i = 0; i < task_info_edf.length; i++) {

		var task_id = task_info_edf[i][0];
		var period = task_info_edf[i][1];
		var wcet = task_info_edf[i][2];
		var a_time = 0.0
		var deadline = a_time + period
		var ceu = 0.0
		var slack_time = (deadline - 0.0) - (wcet - ceu)
		var pre_emption_count = 0
		var deadline_misses = 0
		var completion_count = 0
		var cumulative_response_time = 0.0
		var temp_list = [task_id, period, wcet, a_time, deadline, slack_time, ceu, pre_emption_count, deadline_misses, completion_count, cumulative_response_time];
		task.push(temp_list);
	}

	task.sort(function (x, y) {
		return x[4] - y[4];
	}); //sort on deadline


	var time = 0.0;
	var current_process = 0;
	var total_tasks = task_info_edf.length;
	var last_process = 0;

	while (time <= SIMULATION_TIME) {
		console.log("At Time : " + time.toString());
		current_process = -1;

		for (i = 0; i < task.length; i++) {
			if (task[i][3] <= time) {
				current_process = i;
				break;
			}
		}


		if ((current_process != last_process) && task[last_process][6] > 0.0) {
			console.log("    PRE-EMPTING TASK " + task[last_process][0].toString());
			task[last_process][7] = task[last_process][7] + 1;
		}
		console.log("EXECUTING TASK " + task[current_process][0].toString());
		// if (task[current_process][0] == 2) {
		// 	changeTable('blue');
		// 	appendColumn();	
		// }
		// if (task[current_process][0] == 1) {
		// 	changeTable('green');
		// 	appendColumn();
		// }
		// if (task[current_process][0] == 3) {
		// 	changeTable('yellow');
		// 	appendColumn();
		// }

		if (current_process > -1) {
			task[current_process][6] = task[current_process][6] + 1.0;

			if (task[current_process][6] == task[current_process][2]) {

				console.log("    TASK COMPLETED " + task[current_process][0].toString());
				task[current_process][9] += 1;
				task[current_process][10] += time + 1.0 - task[current_process][3];
				task[current_process][3] += task[current_process][1];
				task[current_process][4] = task[current_process][3] + task[current_process][1];
				task[current_process][6] = 0.0;
			}
		}

		for (i = 0; i < task.length; i++) {
			if (task[i][4] < time) {
				console.log("    TASK " + task[i][0].toString() + " MISSED DEADLINE!!");
				task[i][8] = task[i][8] + 1;
				task[i][3] += task[i][1];
				task[i][4] = task[i][3] + task[i][1];
				task[i][6] = 0.0;
			}
		}

		time += 1.0;
		last_process = current_process;
		task.sort(function (x, y) {
			return x[4] - y[4]; //sort on deadline
		});
	}
}
