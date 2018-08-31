


$(document).ready(function(){

    $("#achi_search" ).keyup(function() {

        let achi_datas = AW.get_achi(this.value);

        console.log(achi_datas);

        let criteria_block = "";


        achi_datas.criteria_tree.forEach(element => {
            
            if(element.Parent!=0)
            {
                criteria_block += '<div>'+'<h5>'+element.Description_Lang+'</h5>';

                if(element.criterias)
                {
                    criteria_block+= generate_criteria(element.criterias,element.Amount);
                }

            criteria_block += '</div>'
            }
        });



        $("#achi_data").html(
        '<h3>'+achi_datas.achi.Title_Lang+'  '+achi_datas.category.Name_Lang+'</h3>'+
        '<p>'+achi_datas.achi.Description_Lang+'</p>'+
        criteria_block
        ); 

      });

});



function generate_criteria(criterias,amount)
{
    let html = "";

    criterias.forEach(element => {
                    
        html += '<div>'+'<p>'+CriteriaTypes[element.Type]+'(Type: '+element.Type+')'+'(Amount: '+amount+')'+'</p>';

        if(element.Modifiers)
                {
                    html+= generate_modtree(element.Modifiers);
                }

        html += '</div>'
    });



    return html;
}

function generate_modtree(modtrees)
{

    let html = "";

    modtrees.forEach(element => {
                    
        html += '<div>'+'<p>'+Modtree[element.Type]+'(Type: '+element.Type+')'+'(Amount: '+element.Amount+')'+'(Asset: '+element.Asset+')'+'</p>';



        html += '</div>'
    });



    return html;
}