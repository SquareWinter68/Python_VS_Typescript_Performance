import random
import time
import csv

class Merge_sort_performance:
    data = []

    def __init__(self, error_correction, max_array_size, start_at, jump_by, element_size_range, filename):
        self.csv_file_name = filename
        self.generate_data(error_correction, max_array_size, start_at, jump_by, element_size_range)
        self.write_to_csv()

    def Mergesort(self, array):

        if len(array) > 1:
            left_array = array[:len(array) // 2]
            right_array = array[len(array) // 2:]

            # Recursion
            self.Mergesort(left_array)
            self.Mergesort(right_array)

            # Merge

            left_index, right_index, merged_index = 0, 0, 0

            while left_index < len(left_array) and right_index < len(right_array):
                if left_array[left_index] < right_array[right_index]:
                    array[merged_index] = left_array[left_index]
                    left_index += 1

                else:
                    array[merged_index] = right_array[right_index]
                    right_index += 1

                merged_index += 1

            while left_index < len(left_array):
                array[merged_index] = left_array[left_index]

                left_index += 1
                merged_index += 1

            while right_index < len(right_array):
                array[merged_index] = right_array[right_index]

                right_index += 1
                merged_index += 1

        return array

    def test_speed(self, times_to_run, array_size_range, element_size_range, function_to_run=None, function_name=None):
        rand_arr = [[random.randint(element_size_range[0], element_size_range[1]) for _ in range(array_size_range)] for _ in range(times_to_run)]
        start_time = time.time()
        for _ in range(times_to_run):
            self.Mergesort(rand_arr[_])
        stop_time = time.time()
        total_time = (stop_time - start_time)*1000

        return [array_size_range, total_time, times_to_run, element_size_range]

    def generate_data(self,error_correction, max_array_size, start_at, jump_by, element_size_range):

        for _ in range(start_at, max_array_size, jump_by):
            x = self.test_speed(error_correction, _, element_size_range, function_name="Mergesort")
            self.data.append({"Array_size": x[0], "Time": x[1], "Times_to_run": x[2], "Element_size_range": x[3][1]})

    def write_to_csv(self):

        with open(r"C:\Users\Vukasin\Desktop\algs_and_ds\CSV_speed_data\{0}".format(self.csv_file_name), "w") as csv_file:
            fieldnames = ["Array_size", "Time", "Times_to_run", "Element_size_range"]
            csv_writer = csv.DictWriter(csv_file, fieldnames)
            csv_writer.writeheader()
            for i in self.data:
                csv_writer.writerow(i)


x = Merge_sort_performance(3, 50000, 100, 100,(0, 1000), "Python_speed.csv")


