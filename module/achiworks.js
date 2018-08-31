const fs = require('fs');

    // https://www.wowhead.com/achievement=11426/heroic-trial-of-valor


 class Achi_Class{

        constructor()
        {
         // Load files
        this.load_json_dbc('./dbc_json/Achievement.json',(data) =>{this.achievement = data;});
        this.load_json_dbc('./dbc_json/Achievement_Category.json',(data) =>{this.achievement_category = data;});
        this.load_json_dbc('./dbc_json/CriteriaTree.json',(data) =>{this.criteria_tree = data;});
        this.load_json_dbc('./dbc_json/Criteria.json',(data) =>{this.criteria = data;});
        this.load_json_dbc('./dbc_json/ModifierTree.json',(data) =>{this.modifiertree = data;});
        }

        
        get_achi(id)
        {

           let current_achi = {};
           let current_category = {};
           let current_criteria_tree = [];
           let current_criterias = [];

           let result = {};

           this.achievement.forEach(element => {
            if(Number(element.ID) == id)
            {
                current_achi = element;   
                return;
            }
           });


           this.achievement_category.forEach(element => {
            if(Number(element.ID) == current_achi.Category)
            {
                current_category = element;   
                return;
            }
           });

           
           this.criteria_tree.forEach(element => {
            if(Number(element.ID) == current_achi.Criteria_Tree)
            {
                current_criteria_tree.push(element);   
                current_criterias.push(element.CriteriaId);
                return;
            }
           });

           // CriteriaTree is parrent or not
           if(current_criteria_tree[0])
           {
                    if(current_criteria_tree[0].Parent==0)
                    {
                                this.criteria_tree.forEach(element => {
                                    if(Number(element.Parent) == current_criteria_tree[0].ID)
                                    {
                                        element.criterias = this.get_criterias(element.CriteriaId);

                                        current_criteria_tree.push(element);   
                                    }
                                    });
                    }

            }


           result.achi = current_achi;
           result.category = current_category;
           result.criteria_tree = current_criteria_tree;

           return result;
        }

        
        get_modifiertree(parent_id)
        {
            let result = [];

            this.modifiertree.forEach(element => {

                if(element.Parent == parent_id && element.Parent !=0)
                {
                    result.push(element);
                }
               });   

            return result;
        }


        get_criterias(id)
        {
            let result = [];

            this.criteria.forEach(element => {

                if(element.ID == id)
                {
                    element.Modifiers = this.get_modifiertree(element.ModifierTreeId);
                    
                    result.push(element);
                }

               });   

            return result;
        }





        load_json_dbc(filename,callback)
        {
            fs.readFile(filename, function (err, data) {
                if (err) {
                  throw err; 
                }
              
                 return callback(JSON.parse(data.toString()));
            });
        }

 };





 module.exports = Achi_Class