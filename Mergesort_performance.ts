class Merge_sort_performance {

    public records =  [
        {size: '0', time: '0', error_correction: '0', element_size_range:'0'}
    ];
    
    constructor(error_correction:number, max_array_size:number, start_at:number, jump_by:number, element_size_range:number, file_path:string, filename:string) {

        
        this.GenerateData(error_correction, max_array_size, start_at, jump_by, element_size_range);
        
        this.Write_to_csv(file_path, filename);
    }

    Merge_Sort(array_:Array<number>){
        let half_length:number = Math.ceil(array_.length/2);
        let left_array = array_.slice(0,half_length);
        let right_array = array_.slice(half_length, array_.length);
        
        //RECURSION
        if (half_length >1){
            this.Merge_Sort(left_array);
            this.Merge_Sort(right_array);
        }
        

        // SORTING
        
        let left_index:number = 0, right_index:number = 0, mereged_index:number = 0;
        
        while (left_index < left_array.length && right_index < right_array.length) {
            if (left_array[left_index] < right_array[right_index]){
                array_[mereged_index] = left_array[left_index];
                left_index ++;
            }

            else{
                array_[mereged_index] = right_array[right_index]
                right_index ++;
            }

            mereged_index ++;

        }

        while (left_index < left_array.length){
            array_[mereged_index] = left_array[left_index];
            left_index ++;
            mereged_index ++;
        }

        while(right_index < right_array.length){
            array_[mereged_index] = right_array[right_index]
            right_index ++;
            mereged_index ++;
        }
        return array_;
    }

    Test_speed(times_to_run:number, array_size_range:number, element_size_range:number, function_name:string = ""):Array<any>{

        let arr = [[0],[1,2,3,4,5]]
        for(let i:number = 0; i < times_to_run; i++){
            let placeholder: [number] = [0];
                for(let _:number = 0; _ < array_size_range; _ ++){
                    placeholder.push(Math.floor((Math.random()*element_size_range))+1);
    
                }
            //console.log(placeholder);
            arr.push(placeholder);
        }
    
        
        let start_time = performance.now();
        for(let _ = 0; _ < times_to_run; _ ++){
            this.Merge_Sort(arr[_])
        }
        let stop_time = performance.now();
        let total_time = stop_time-start_time;
        //return `${function_name} ran for ${times_to_run} times`
        //return `${function_name} ran for ${times_to_run} times.\nIt finnished in ${total_time} milliseconds`
        return [total_time, times_to_run, array_size_range, element_size_range]
    }

    GenerateData(error_correction:number, max_array_size:number, start_at:number, jump_by:number, element_size_range:number, ):any{
        for(let _ = start_at; _ < max_array_size; _ += jump_by){
            let x = this.Test_speed(error_correction, _ , element_size_range, "Mergesort");
            this.records.push({size: `${x[2]}`, time: `${x[0]}`, error_correction: `${x[1]}`, element_size_range: `${x[3]}`})
        }
        return this.records
    }

    Write_to_csv(file_path:string, filename:string){
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            //path: `C:/Users/Vukasin/Desktop/google_foobar/ts_bullshit/csv_files/${filename}`,
            path : `${file_path}/${filename}`,
            header: [
                {id: 'size', title: 'Array_size'},
                {id: 'time', title: 'Time'},
                {id: 'error_correction', title: 'Times_to_run'},
                {id: "element_size_range", title: 'Element_size_range'}
            ]
});

        csvWriter.writeRecords(this.records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
 
    }
}

let x = new Merge_sort_performance(3, 50000, 100, 100, 1000, "C:/Users/Vukasin/Desktop/algs_and_ds/CSV_speed_data", "Typescript_speed.csv");

