# Final Project

## Introduction

This is a final project for the
[Interacting with Data](https://github.com/Brown-BIOL2430-S04-Fall2015/syllabus)
seminar in fall 2015. This project provides summaries and
visualizations of results in pathway analysis using expression data.


To view this project, please download all the files and set up a local
server, then open *index.html*.

## The data

The raw data used for this example can be found [here](http://www.ncbi.nlm.nih.gov/sites/GDSbrowser?acc=GDS3716). The raw data is analyzed in `R` to obtain a list of top significant gene sets. The standardized expression matrix of each gene set is then exported as .tsv file in a specific format. See file "set34.tsv" as an example.

## Background

<img  src="https://github.com/jamiezhang/finalproject/blob/master/r_heatmap.PNG" alt="A typical heatmap in R" style="width:
400px;"/>

- gene symbols are hard to read when the set size gets large.
- may want to check the actuall expression vlaue.

[GSEA Example](http://software.broadinstitute.org/gsea/resources/gsea_pnas_results/diabetes_C2.Gsea/index.html)

- pre-generated and not interactive

[D3 heatmap with hierarchical clustering](http://blog.nextgenetics.net/demo/entry0044/)

- requires 3-level nested array as input data
- no legend

[D3 heatmap for R](http://rpubs.com/jcheng/mtcars-heatmap)


## This project

### Mapping of data to aesthetics

[//]: # (How will aesthetic attributes ( X / Y / color / shape / size /texture/ etc ) will be mapped to the data?)

- Each matrix entry maps to each small rectangle. Value of each entry determines the color of each rectangle, indices of each entry determines the position of each rectangle.

- Color scale: `3.scale.threshold()` maps pre-specified intervals to a color gradient. The intervals are calculated as the lower and upper quantiles of probabilities (1e-5, 1e-3, 5e-2) in distribution N(0,1).

- X scale and Y scale: `d3.scale.ordinal` maps each pair of matrix indices (discrete) to width and height of the SVG (continous).

### Motion

- A click event is used for when the button corresponding to a gene set is clicked, the heatmap of the gene set will be plotted on the right.

- A mouse-over motion is used for when one puts the mouse on a
rectangle of the heatmap, the rectangle is highlighted and its corresponding sample id, gene name, and standardized expression value will pop up.

## Assessment

### What to improve:

- Put the buttons are inside the table, replacing the column **name**. Although this can be achieved by coding the html by hand, a solution using D3 selector is in need.
- Adding a slider that changes the scale of quantile continuously.
- The whole process from raw data to analyzed results and visualization is only  half-automated.
- Better way to clear a SVG?

