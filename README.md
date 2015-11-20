# Final Project

## Introduction

This is a final project for the
[Interacting with Data](https://github.com/Brown-BIOL2430-S04-Fall2015/syllabus)
seminar in fall 2015. This project provides summaries and
visualizations of results in pathway analysis using expression data.

[//]: # (To view this project, ... (embed visualization here or provide instructions on how to view the project).)

## The data

Publically available gene expression dataset from
[Gene Expression Omnibus (GEO) repository](http://www.ncbi.nlm.nih.gov/gds). After
being downloaded, the raw data is processed and analyzed in *R* and exported to .json
files to be used in creating one HTML table and D3 heatmaps. 


## Background

### Examples 

<img  src="r_heatmap.png" alt="A typical heatmap in R" style="width:
400px;"/>

- gene symbols are hard to read when the set size gets large.
- may want to check the actuall expression vlaue.

[GSEA Example](http://software.broadinstitute.org/gsea/resources/gsea_pnas_results/diabetes_C2.Gsea/index.html)

[D3 heatmap for R](http://rpubs.com/jcheng/mtcars-heatmap)

[D3 heatmap with hierarchical clustering](http://blog.nextgenetics.net/demo/entry0044/)

[//]: # (Examples of previous visualizations of similar data or processes, if any exist... Include links or add images to markdown document... how were data mapped to aesthetics in these previous approaches? Was there filtering? Shortcomings of previous approaches, or potentially interesting gaps between previous approaches...)


## This project

### Mapping of data to aesthetics

[//]: # (How will aesthetic attributes ( X / Y / color / shape / size /texture/ etc ) will be mapped to the data?)

Given a numeric  expression matrix Y, colors of each rectangle are
mapped from the dichotomized values into a color gradient from blue to red. The width
and length of each rectangle will be re-scaled such that the heatmaps
of different gene sets will have the same dimension. 


[//]: # ( ### Filtering  Are data filtered? ie in some views are some data not mapped to particular attributes of the image? What is the goal of the filtering?)

[//]: # ( ### Extra ink Are there aesthetic attributes that are not mapped to the data? If so, what purpose do they serve ( redundancy for robustness / improve visual metaphor / but data in context / beauty / etc )? )

[//]: # (Are any data mapped to more than one aesthetic attribute? Why?)

### Motion

- A click event is used for when one click the row of statistics
corresponding to a gene set, the heatmap of the gene set will show on
the right of the table.

- A mouse-over motion is used for when one puts the mouse on a
rectangle of the heatmap, the corresponding sample id, gene name, and
expression value will show rigth next to the mouse.

[//]: # (If motion is used, what purpose does it serve ( metaphor (eg representing motion in real world) / transition continuity between views / etc))


<!---
### Perspective

To what extent is perspective (eg mappings) controlled by users vs hard coded in advance? How does this project aid in exploration vs exposition?

## Assessment

Was the new visualization successful at providing insight that was not possible or more difficult with previous approaches?

What are the main limitations of new approach?

What are future directions this could go in?
--> 

