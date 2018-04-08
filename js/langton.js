/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
  constructor() {
    this.Pattern = new Pattern()
    this.Simulation = new Simulation()
    this.iterationNumber;
    this.interval;
    this.SimulationInterval;
    this.isSimulationRunning = false;
    this.patterns = [];
  }
  RegisterOnReady() {
    this.Pattern.RegisterOnReady()
    this.Simulation.RegisterOnReady()

    $($.proxy(this.onReady, this))
  }
  onReady() {
    this.Grid = new Grid("Grid", this.Simulation.Size)
    this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY);
    this.displayAntInfo();
    $(".condition").css("display", "block");
    this.getPatterns();

    $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))

    console.log("Langton.onReady")

    $("#Reset").on("click", $.proxy(this.onResetClick, this)); // 2.b & 2.c && 2.g

    $("input:radio[name='size']").on("change", $.proxy(this.onSimulationSizeChange, this));

    $("#MoveForward").on("click", $.proxy(this.onMoveForwardClick, this));

    $("#Start").on("click", $.proxy(this.onStartButtonClick, this));

    $("#Pattern").on("change", $.proxy(this.getStepsPatterns, this));

  }

  // 2.b
  onResetClick() {
    console.log("Reset button clicked");
    //this.resetSimulation(); // 2.b && 2.c
    this.stopSimulation(); // 2.g
  }

  // 2.c
  onSimulationSizeChange() {
    console.log("Size of simulation changed");
    this.resetSimulation();
  }

  // 2.d
  onMoveForwardClick() {

    this.iterationNumber = $("#NbSteps").val();

    this.interval = $("#Interval").val();

    for(let i = 0; i < this.iterationNumber ;i++) {

      setTimeout(()=> {

        let caseColor = this.Grid.GetColor(this.Ant.X, this.Ant.Y);

        if(caseColor) {
          this.setColorAndTurnAnt(caseColor);
        }

      }, this.interval);
    }

  }

  // 2.e & 2.f
  onStartButtonClick() {

    this.isSimulationRunning = !this.isSimulationRunning;

    $("#Start").html(this.isSimulationRunning ? "Arr&ecirc;ter" : "D&eacute;marrer");

    this.isSimulationRunning ? this.startSimulation() : this.stopSimulation();

  }

  startSimulation() {

    $("#Start").html("Arr&ecirc;ter");

    this.interval = $("Interval").val();

    this.SimulationInterval = setInterval(() => {

      let caseColor = this.Grid.GetColor(this.Ant.X, this.Ant.Y);

      if(caseColor) {
        this.setColorAndTurnAnt(caseColor);
      }

    }, this.interval);

    this.isSimulationRunning = true;
  }

  stopSimulation() {
    $("#Start").html("D&eacute;marrer");
    clearInterval(this.SimulationInterval);
    this.isSimulationRunning = false;
  }

  setColorAndTurnAnt(caseColor) {
    this.Grid.SetColor(this.Ant.X, this.Ant.Y, (caseColor == "#FFFFFF") ? "#000000" : "#FFFFFF");
    this.Ant.Turn((caseColor == "#FFFFFF") ? "right" : "left");
  }

  resetSimulation() {
    console.log("Reset the simulation");
    this.Grid.Size = this.Simulation.Size;
    this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY);
  }

  displayAntInfo() {
    this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);

    // 2.a
    $(".ant-x").html(this.Ant.X);
    $(".ant-y").html(this.Ant.Y);
    $(".ant-direction").html(this.Ant.Direction);
    $(".ant-nb-steps").html(this.Ant.NbSteps);
    //
  }

  static get Url() {
    return "https://api.myjson.com/bins/crrrn";
  }

  getStepsPatterns() {
    var selectPattern = $('#Pattern option:selected').index();
    var steps = this.patterns[selectPattern];
    var htmlTab;

    $.each(steps, function(step) {
      htmlTab += Pattern.GetHtmlRow(step);
    })

    var tab = $("#CurrentPattern > tbody");
    console.log(htmlTab);
    tab.html(htmlTab);
  }

  // 3.a
  getPatterns() {

    let url = Langton.Url;

    let patternSelect = $("#Pattern");
    patternSelect.prop("disabled", true);

    let patterns = [];
    let patternSteps = [];

    let onSuccess = (data , status , xhr) => {
      $.each(data, function() {
        $.each(this, (index, value) => {
          patterns.push("<option value="+value.name+">"+value.name+"</option>");
          patternSteps[index] = value.steps;
        });
      });
      patternSelect.html(patterns);
      this.patterns = patternSteps;
    };

    let onComplete = (xhr, status) => {
      patternSelect.prop("disabled", false);
    };

    let onError = (xhr, status, error) => {
      console.log("Code d'erreur : "+ xhr.status + "\n" + "Message d'erreur : "+ xhr.statusText);
    };

    let settings = {
      type: 'GET',
      success: onSuccess,
      complete: onComplete,
      error: onError,
      crossDomain: true
    }

    $.ajax(url , settings);

  }

}

let langton = new Langton()
langton.RegisterOnReady()
