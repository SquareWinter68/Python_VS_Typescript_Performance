import matplotlib.pyplot as plt
import pygal
import pandas as pd
from pygal.style import *
import numpy as np

class Plot_performances:

    def __init__(self, start=None, stop=None):
        self.pyfile = pd.read_csv(r"C:\Users\Vukasin\Desktop\algs_and_ds\CSV_speed_data\Python_speed.csv")
        self.tsfile = pd.read_csv(r"C:\Users\Vukasin\Desktop\algs_and_ds\CSV_speed_data\Typescript_speed.csv")
        error_correction = self.pyfile["Times_to_run"][1]

        if start and stop:
            print("entered")
            self.array_size = self.pyfile["Array_size"][start:stop]
            time_python = self.pyfile["Time"][start:stop]
            time_typescript = self.tsfile["Time"][start:stop]

        else:
            self.array_size = self.pyfile["Array_size"]
            time_python = self.pyfile["Time"]
            time_typescript = self.tsfile["Time"]

        self.time_python = list(map(lambda x: x / error_correction, time_python))
        self.time_typescript = list(map(lambda x: x / error_correction, time_typescript))

    def Matplotlib(self, python=False, typescript=False, both=False, save=False, show=False,):


        if both:
            plt.plot(self.array_size, self.time_python )
            plt.plot(self.array_size, self.time_typescript )
            plt.legend(["Python", "Typescript"])

        elif python:
            plt.plot(self.array_size, self.time_python )
            plt.legend(["Python"])

        elif typescript:
            plt.plot(self.array_size, self.time_typescript )
            plt.legend(["Typescript"])

        plt.xlabel("Array Size (elements)")
        plt.ylabel("Sorting Time (milliseconds)")
        plt.title("Mergesort performance")
        plt.grid()

        if show:
            plt.show()
        elif save:
            plt.savefig("plot.png")


    def Pygal(self, python=False, typescript=False, both=False, bar_chart=False, line_chart=False, fit_screen=False):
        if fit_screen:
            indices = np.round(np.linspace(0, len(self.array_size) - 1, 10)).astype(int)
            self.array_size = [self.array_size.tolist()[_] for _ in indices]
            self.time_python = [self.time_python[_] for _ in indices]
            self.time_typescript = [self.time_typescript[_] for _ in indices]
            print(self.array_size)
            print(self.time_python)
            print(self.time_typescript)


        if not bar_chart and not line_chart:
            bar_chart = True
        if bar_chart:
            chart = pygal.Bar(x_title='Array Size', y_title='Time (milliseconds)', style=DarkColorizedStyle)

        elif line_chart:
            pass



        if both:
            chart.add("python", self.time_python)
            chart.add("Typescript", self.time_typescript)
            chart.x_labels = self.array_size

        elif python:
            chart.add("python", self.time_python)
            chart.x_labels = self.array_size

        elif typescript:
            chart.add("Typescript", self.time_typescript)
            chart.x_labels = self.array_size



        chart.title = 'Mergesort Performance'

        chart.render_to_file("Speed_line_chart.svg")





#print(array_size,time)

x = Plot_performances(start=1, stop=100)
x.Matplotlib(typescript=True, save=True)
#x.Pygal(typescript=True, bar_chart=True, fit_screen=True)