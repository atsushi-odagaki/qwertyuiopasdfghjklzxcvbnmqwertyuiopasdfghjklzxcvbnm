Ext.onReady(function () {
    var ganttPanel = Ext.create({
        xtype: 'ganttpanel',
        requires: [
            'Gnt.plugin.taskeditor.TaskEditor'
        ],
        // lockedGridConfig : {
        //     width: 300,
        //     title : 'Locked Section',
        //     collapsible : true
        // },
        
        // schedulerConfig : {
        //     collapsible : true,
        //     title : 'Scheduling Section'
        // },
        startDate           : new Date(2017, 1-1, 15), // month is 0-based.
        endDate             : new Date(2017, 3-1, 18),
        height: 800,
        width: '100%',
        renderTo: document.body,
        viewPreset              : 'weekAndDayLetter',
        rowHeight               : 40,
        showProgressLine: true,

        // rollup shows summary line if 'rollupcolumn' dataIndex is true
        //showRollupTasks         : true,
        //rollupLabelField : 'Name',
        
        crudManager: {
            autoLoad: true,
            transport: {
                load: {
                    method: 'GET',
                    url: 'data.json'
                },
                sync: {
                    method: 'POST',
                    url: 'TODO'
                }
            }
        },
        columns: [
            { xtype : 'wbscolumn', width : 80 },
            {
                xtype: 'namecolumn',
                width: 200
            },
            // {
            //     xtype : 'treecolumn',
            //     header: 'Tasks',
            //     sortable: true,
            //     dataIndex: 'Name',
            //     width: 200
            // },
            {
                xtype : 'startdatecolumn',
                resizable: true,
                sortable: false
            },
            {
                xtype : 'enddatecolumn',
                //hidden : true
            },
            {
                xtype : 'durationcolumn',
                tdCls : 'sch-column-duration',
                menuDisabled: true,
            },
            {
                xtype : 'percentdonecolumn',
                hideable: false
            },
            {
                xtype: 'resourceassignmentcolumn',
                width: 150
            }
            //,{ xtype : 'rollupcolumn' }
        ],
        plugins             : [
            Ext.create('Sch.plugin.TreeCellEditing', {
                clicksToEdit: 1
            }),
            {
                ptype      : 'gantt_progressline',
                statusDate : new Date(2017, 2-1, 7)
            },
            'gantt_taskcontextmenu',
            //'gantt_taskeditor'
            Ext.create("Gnt.plugin.TaskEditor", {
                title: 'Custom Task Editor',
                showAdvancedForm: true,
                showAssignmentGrid: true,
                showDependencyGrid: true,
                showNotes: true,
                listeners: {
                    show: function() {
                    }
                }
            }),
        ],
        listeners: {
            render: function() {
                // This is a temp code for trial
                Ext.defer(function(){
                    var trialExpired = document.querySelector('.trialmask');
                    if (trialExpired)
                        Ext.get(trialExpired).parent().hide();
                }, 500);
            }
        }
    });

    // ganttPanel.on('taskclick', function (ganttPanel, task) {
    //     alert("You've clicked on the task named " + task.getName());
    // }); 
});