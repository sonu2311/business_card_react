function Card({card, card_index, copy_card, calc_budget, card_delete}) {

  const edit = function() {
    // AngularJS : card["is_edit"] = !card["is_edit"]
    card.set("is_edit", !card.get("is_edit"))
  }

  useEffectOnChange(() => {
    calc_budget()
  }, [card.get("project_budget")])

  return (
    <div className="card" >
      <div className="hsplit" >
        <div className="card_field_name" >Card Name:</div>
        <div className="card_field_height" >
        {!card.get("is_edit") ? card.get("card_name") : <input className="card_field_input form-control" value={card.get("card_name")} onChange={card.setter("card_name")}/>}
        </div>
      </div>
      <div className="hsplit">
        <div className="card_field_name" >Project Budget: </div>
        <div className="card_field_height" >
          {!card.get("is_edit") ? card.get("project_budget") : <input type="number" className="card_field_input form-control" value={card.get("project_budget")} onChange={card.setter("project_budget")}/>}
        </div>
      </div>
      <div className="hsplit">
        <div className="card_field_name" >Project End Date: </div>
        <div className="card_field_height" >
         {!card.get("is_edit") ? card.get("project_end_date") : <input className="card_field_input form-control" type="datetime-local" value={card.get("project_end_date")} onChange={card.setter("project_end_date")}/>}
        </div>
      </div>
      <div>
        <div style={{borderBottom: "solid #ddd 1px"}}></div>
        <div className="hsplit" >
          <button className="btn btn-primary card-button" onClick={edit} >{card.get("is_edit") ? "Save" : "Edit"}</button>
          <button className="btn btn-primary card-button" onClick={() => card_delete(card_index)} >Delete</button>
          <button className="btn btn-primary card-button" onClick={() => copy_card(card)}>Copy Card</button>
        </div>
      </div>  
    </div>
  );
}

function MainFunc(props) {

  const state = useDictState({
    card_list: [
      {card_name :"Project01",
       project_budget: 5000,
       project_end_date:"2022-10-06T14:45",
       is_edit:false
      },
      {card_name :"Project02",
       project_budget: 6000,
       project_end_date:"2022-10-06T14:45",
       is_edit:false
      },
      {card_name :"Project03",
       project_budget: 7000,
       project_end_date:"2022-10-06T14:45",
       is_edit:false
      },
      {card_name :"Project04",
       project_budget: 8000,
       project_end_date:"2022-10-06T14:45",
       is_edit:false
      }
    ],
    total_budget: 18000
  })

  const copy_card = function(card) {
    // Angular : state.card_list.push(card)
    state.get("card_list").push({
      card_name :"Copy of "+ card.get("card_name"),
      project_budget: card.get("project_budget"),
      project_end_date: card.get("project_end_date"),
      is_edit: false})
    state.set("total_budget", state.get("total_budget") + card.get("project_budget"))
  }

  const card_delete = function(card_index) {
    const card_list = state.get("card_list")
    const budget_loss = card_list.get(card_index).get("project_budget")
    let new_card_list = []
    for(var i = 0; i < card_list.length(); i++) {
      if (i != card_index) {
        new_card_list.push(card_list.get(i).value())
      }
    }
    state.set("card_list", new_card_list)
    state.set("total_budget", state.get("total_budget") - budget_loss)
  }

  const calc_budget = function() {
    const card_list = state.get("card_list")
    let total_budget = 0
    for(var i = 0; i < card_list.length(); i++) {
      const project_budget = card_list.get(i).get("project_budget")
      total_budget += parseInt(card_list.get(i).get("project_budget"))
    }
    state.set("total_budget", total_budget)
    console.log("calc_budget")
  }

  return (
    <div style={{maxWidth: "1200px", margin: "auto"}} >
      <div className="top_card" >
        <span>Total Projects: {state.get("card_list").length()}, Total Budget = {state.get("total_budget")}</span>
      </div>

      <div className="hsplit">
        {state.get("card_list").map((card, card_index)=> (
          <div className="col-lg-4 col-sm-6 col-xs-12" >
            <Card copy_card={copy_card} card={card} card_index={card_index} calc_budget={calc_budget} card_delete={card_delete} />
          </div>
        ))}
      </div>
    </div>
  );
}
