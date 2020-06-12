var task_info_rms = [
	[1, 10, 4],
	[2, 7, 1],
	[3, 9, 5]
];
function rms() {
    const SIMULATION_TIME = 35;

    console.log("RMS Scheduler");

    //var task_info_rms = [];

    /*var task_info_rms = [
        [1, 10, 4],
        [2, 7, 1],
        [3, 9, 5]
    ];*/
    var a, b, c;
   
    //rmsinsert(4, 6, 7);
    console.log(task_info_rms);

    var task = [];

    for (var i = 0; i < task_info_rms.length; i++) {

        var task_id = task_info_rms[i][0];
        var period = task_info_rms[i][1];
        var wcet = task_info_rms[i][2];
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

    //console.log(task);

    /*var xxx = task.sort(function (x, y) {
        return x[5] - y[5];
    }); 
    console.log(xxx);
    */

    task.sort(function (x, y) {
        return x[1] - y[1];
    }); //Sort on slack time


    var time = 0.0;
    var current_process = 0;
    var total_tasks = task_info_rms.length;
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

    }

    //console.log("Task    Period    WCET    ArrivalTime    Deadline    SlackTime    #Pre-empts    #deadline misses    #completions    cum_resp_time    avg_resp_time");

    /*for (const each of task) {
        if (each[10] == 0.0){
            var temp = 0.0 ;}
            else{
                temp = each[10]/each[9];
                console.log(each[0].toString() + "    " + each[1].toString() + "    " + each[2].toString() + "    " + each[3].toString() + "        " + each[4].toString() + "        " + each[5].toString() + "            " + each[7].toString()+ "        " + each[8].toString() + "        " + each[9].toString() + "        " + each[10].toString()+ "        "+ temp.toString());}
            }*/
}
function rmsinsert(a, b, c) {
	task_info_rms.push([a, b, c]);
}