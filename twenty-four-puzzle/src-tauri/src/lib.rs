extern crate meval;
use meval::eval_str;
use std::collections::HashSet;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn eval_expression(expression: String) -> String {
  match eval_str(expression.trim()) {
    Ok(value) => value.to_string(),
    Err(e) => e.to_string(),
  }
}


fn extract_numbers(expression: &str) -> HashSet<i32> {
  let mut numbers = HashSet::new();
  let mut current_number = String::new();

  for ch in expression.chars() {
    if ch.is_digit(10) {
      current_number.push(ch);
    } else if !current_number.is_empty() {
      if let Ok(number) = current_number.parse::<i32>() {
        numbers.insert(number);
      }
      current_number.clear();
    }
  }

  // Insert the last number if there is one
  if !current_number.is_empty() {
    if let Ok(number) = current_number.parse::<i32>() {
      numbers.insert(number);
    }
  }
  numbers
}

fn check_expression(expression: &str, required_numbers: &HashSet<i32>) -> bool {
    let allowed_chars: HashSet<char> = ['+', '-', '*', '/', '(', ')'].iter().cloned().collect();
    let mut numbers = HashSet::new();
    let mut current_number = String::new();

    for ch in expression.chars() {
      if ch.is_digit(10) {
        current_number.push(ch);
      } else if allowed_chars.contains(&ch) {
        if !current_number.is_empty() {
          if let Ok(number) = current_number.parse::<i32>() {
            numbers.insert(number);
          }
          current_number.clear();
        }
      } else {
        return false;
      }
    }

    // Insert the last number if there is one
    if !current_number.is_empty() {
      if let Ok(number) = current_number.parse::<i32>() {
        numbers.insert(number);
      }
    }
    numbers == *required_numbers
}

#[tauri::command]
fn check_expression_format(expression: &str, a: i32, b: i32, c: i32, d: i32) -> bool {
  let required_numbers: HashSet<i32> = [a, b, c, d].iter().cloned().collect();
  if check_expression(expression, &required_numbers) {
    return true;
  }
  false
}


fn evaluate_expression(expression: &str) -> Result<f64, meval::Error> {
  meval::eval_str(expression)
}

fn generate_expressions(numbers: &[i32]) -> HashSet<String> {
  let mut expressions = HashSet::new();
  let operators = ["+", "-", "*", "/"];

  // Generate all permutations of the numbers
  for &a in numbers {
    for &b in numbers {
      if b == a { continue; }
      for &c in numbers {
        if c == a || c == b { continue; }
        for &d in numbers {
          if d == a || d == b || d == c { continue; }

          // Generate all combinations of operators
          for &op1 in &operators {
            for &op2 in &operators {
              for &op3 in &operators {
                // Generate expressions with different parentheses arrangements
                let expr1 = format!("(({}{}{}){}{}){}{}", a, op1, b, op2, c, op3, d);
                let expr2 = format!("({}{}({}{}{})){}{}", a, op1, b, op2, c, op3, d);
                let expr3 = format!("({}{}{}){}({}{}{})", a, op1, b, op2, c, op3, d);
                let expr4 = format!("{}{}(({}{}{}){}{})", a, op1, b, op2, c, op3, d);
                let expr5 = format!("{}{}({}{}({}{}{}))", a, op1, b, op2, c, op3, d);

                expressions.insert(expr1);
                expressions.insert(expr2);
                expressions.insert(expr3);
                expressions.insert(expr4);
                expressions.insert(expr5);
              }
            }
          }
        }
      }
    }
  }

  expressions
}

#[tauri::command]
fn solve(a: i32, b: i32, c: i32, d: i32) -> bool {
  let numbers = [a, b, c, d];
  let target = 24;

  let expressions = generate_expressions(&numbers);
  let mut found = false;

  for expr in expressions {
    if let Ok(result) = evaluate_expression(&expr) {
      if (result - target as f64).abs() < 1e-6 {
        found = true;
        break;
      }
    }
  }

  if found {
    return true;
  }
  false
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![greet, eval_expression, check_expression_format, solve])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
