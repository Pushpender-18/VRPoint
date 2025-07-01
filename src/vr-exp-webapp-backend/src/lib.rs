use ic_cdk::query;

#[query]
fn hello_world() -> String {
	return "Hello World".to_string();
}

ic_cdk::export_candid!();